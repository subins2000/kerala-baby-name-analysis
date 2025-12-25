require "../data/common"
require 'set'

START_YEAR = 1920
END_YEAR = 2007
CURRENT_YEAR = Time.now.year
TOP_N_LIMIT = 30

def rank_per_gender(gender)
  @tracked_names = Set.new

  (START_YEAR..END_YEAR).each do |year|
    age = CURRENT_YEAR - year
    top_names = Human.select("call_name")
                    .where(age: age, gender:)
                    .group(:call_name)
                    .order(Arel.sql("COUNT(*) DESC"))
                    .limit(TOP_N_LIMIT)
                    .pluck(:call_name)

    top_names.each do |name|
      @tracked_names.add(name)
    end
  end

  puts "Finished getting names"

  # binding.pry
  
  @per_year_count = {}

  @tracked_names.each do |name|
    ages = ((CURRENT_YEAR - END_YEAR)..(CURRENT_YEAR - START_YEAR)).to_a
    
    Human.where(
      call_name: name,
      age: ages,
      gender:
    ).group(:age).count.reverse_each do |age, count_in_this_age|
      year = CURRENT_YEAR - age

      @per_year_count[year] ||= {}
      @per_year_count[year][name] = count_in_this_age
    end
  end

  puts "Finished getting count of each person per year"

  @names_and_positions_per_year = {}

  # binding.pry

  @per_year_count.each do |year, count|
    count.sort_by { |name, count| count }.reverse!.each_with_index do |name_and_count, index|
      @names_and_positions_per_year[name_and_count[0]] ||= {}
      @names_and_positions_per_year[name_and_count[0]][year] = index + 1
    end    
  end

  # binding.pry

  @result = []

  @names_and_positions_per_year.each do |name, positions_per_year|
    # The frontend JS script expects data to only have names that come at least once in the top 10 in any year
    next unless positions_per_year.values.any? { |value| value <= 10 }

    @result << {
      name:,
      values:
        positions_per_year.sort.map do |year, position|
          {
            year:,
            position:
          }
        end
    }
  end

  @result
end

File.write("boys.json", JSON.pretty_generate(rank_per_gender("M")))
File.write("girls.json", JSON.pretty_generate(rank_per_gender("F")))
