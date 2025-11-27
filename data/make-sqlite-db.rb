require "./common"

require "benchmark"
require "nokogiri"

def call_name(name)
  parts = name.gsub(".", " ").split(" ")
  parts.select { |part| part.grapheme_clusters.size > 1 }.first&.capitalize
end

def process_html(path)
  @records = []

  doc = Nokogiri::HTML(File.read(path))
  params = doc.css(".ubuntuB.fw-bold").map(&:text)
  district = params[0].downcase
  local_body = params[1]
  ward = params[2]
  polling_station = params[3]

  doc.css(".voters-list tr").each do |tr|
    tds = tr.css("td")
    
    next if tds[1].nil? # കൂട്ടിച്ചേർക്കലുകൾ heading

    # <td><span class="badge bg-danger">DELETED</span>Saritha K</td>
    name = tds[1].xpath("./text()").text.strip # Using xpath to avoid getting "DELETED" text

    gender, age = tds[5].text.split("/").map(&:strip)

    name_call = call_name(name)
    next if name_call.blank?

    @records << {
      name:, call_name: name_call, gender:, age:, district:, local_body:, ward:, polling_station:
    }

    Human.insert_all(@records) && @records = [] if @records.size == 1000
  end
end

time = Benchmark.measure do
  Dir.glob("#{ENV["HTML_DIR"]}/**/*.html") do |file|
    puts "Processing #{file}"
    process_html(file)
  end
end

puts time