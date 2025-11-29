require "../data/common"
require 'set'

START_YEAR = 1930
END_YEAR = 2007
CURRENT_YEAR = Time.now.year
TOP_N_LIMIT = 30
GENDER = "F"

@tracked_names = Set.new

(START_YEAR..END_YEAR).each do |year|
  age = CURRENT_YEAR - year
  top_names = Human.select("call_name")
                   .where(age: age, gender: GENDER)
                   .group(:call_name)
                   .order(Arel.sql("COUNT(*) DESC"))
                   .limit(TOP_N_LIMIT)
                   .pluck(:call_name)

  top_names.each do |name|
    # Normalize name
    name = "Bindhu" if name == "Bindu"
    @tracked_names.add(name)
  end
end

# binding.pry

@cumulative = {}

@tracked_names.each do |name|
  @count = 0
  ages = ((CURRENT_YEAR - END_YEAR)..(CURRENT_YEAR - START_YEAR)).to_a

  # binding.pry
  
  Human.where(
    call_name: name,
    age: ages,
    gender: GENDER
  ).group(:age).count.reverse_each do |age, count_in_this_age|
    @count += count_in_this_age

    year = CURRENT_YEAR - age
    @cumulative[year] ||= {}
    @cumulative[year][name] = @count
  end
end

@result = []
(START_YEAR..END_YEAR).each do |year|
  @cumulative[year].each do |name, count|
    @result << {
      date: "#{year}-01-01",
      name: name,
      value: count
    }
  end
end

File.write("analysis.json", JSON.pretty_generate(@result))
