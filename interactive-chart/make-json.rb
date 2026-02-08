require "../data/common"
require 'set'

START_YEAR = 1920
END_YEAR = 2007
CURRENT_YEAR = Time.now.year
TOP_N_LIMIT = 30

def rank_per_gender(gender)
  @names_and_positions_per_year = {}

  # binding.pry

  Human.select(
    :name,
    :year,
    "ROW_NUMBER() OVER (PARTITION BY year ORDER BY count DESC) AS position"
  ).where(gender:).order(:year, "position").each do |human|
    @names_and_positions_per_year[human.name] ||= {}
    @names_and_positions_per_year[human.name][human.year] = human.position
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

  @result.sort_by! { |r| r[:name] }
end

File.write("boys.json", JSON.pretty_generate(rank_per_gender("M")))
File.write("girls.json", JSON.pretty_generate(rank_per_gender("F")))
