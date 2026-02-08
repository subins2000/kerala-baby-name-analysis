require "../data/common"
require 'set'

START_YEAR = 1940
END_YEAR = 2007
AGE_OF_A_NAME = 8
GENDER = "F"

@result = []

Human.where(gender: GENDER, year: START_YEAR..END_YEAR).distinct.order(:name, :year)
  .group_by(&:name)
  .each do |name, rows|
    rows.each_with_index do |_, index|
      start = [index - AGE_OF_A_NAME, 0].max
      considered_rows = rows[start..index]

      @result << {
        date: "#{considered_rows.last.year}-01-01",
        name: name,
        value: considered_rows.sum { |row| row[:count] }
      }
    end
  end

File.write("analysis.json", JSON.pretty_generate(@result))
