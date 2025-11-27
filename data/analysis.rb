require "./common"

@cumulative = {}

def most_frequent_names(year, limit = 30)
  age = 2025 - year
  where_clause = {age:}
  where_clause[:gender] = "F"
  Human.select("COUNT(*) AS co, call_name").where(where_clause).group(:call_name).order(co: :desc).limit(limit).map do |item|
    {call_name: item['call_name'], count: item['co']}
  end
end

# binding.pry

@result = []
(1930..2000).each do |year|
  most_frequent_names(year, 30).each do |item|
    name = item[:call_name]

    if name == "Bindu"
      name = "Bindhu"
    end

    value = if @cumulative[name]
      @cumulative[name] += item[:count]
      @cumulative[name]
    else
      @cumulative[name] = item[:count]
      item[:count]
    end

    next unless year > 1970

    @result << {
      date: "#{year}-01-01",
      name:,
      value:
    }
  end
end

File.write("../analysis.json", JSON.pretty_generate(@result))
