require "./common"

class AllDb < ActiveRecord::Base
end

AllDb.establish_connection(
  adapter: 'sqlite3',
  database: File.dirname(__FILE__) + '/all.sqlite'
)

# 2. Define a model class (corresponding to a table)
class AdvancedHuman < AllDb
  self.table_name = "humans"
end

def normalize_names
  @name_aliases = {
  "Bindhu" => ["Bindu"],
  "Aishwarya" => ["Aiswarya", "Aiswaria"],
  "Fathima" => ["Fatima"],
  "Geetha" => ["Geeta", "Gita"],
  "Sindhu" => ["Sindu"],
  "Soumya" => ["Sowmya"],
  "Anitha" => ["Anita"],
  "Sandhya" => ["Sandya"],
  "Siby" => ["Sibi"],
  "Muhammad" => ["Muhammed", "Mohammed"],
  "Abdul" => ["Abdhul"],
}

  @name_aliases.each do |canonical, aliases|
    AdvancedHuman.where(call_name: aliases).update_all(call_name: canonical)
  end
end

START_YEAR = 1920
END_YEAR = 2007
CURRENT_YEAR = Time.now.year
TOP_N_LIMIT = 50

def make_simplified_db(gender)
  @tracked_names = Set.new

  (START_YEAR..END_YEAR).each do |year|
    age = CURRENT_YEAR - year
    top_names = AdvancedHuman.select("call_name")
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
    
    AdvancedHuman.where(
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

  @per_year_count.each do |year, count|
    count.each do |name, count|
      Human.create!(
        name: name,
        gender: gender,
        year: year,
        count: count
      )
    end
  end
end

normalize_names
make_simplified_db("F")
make_simplified_db("M")
