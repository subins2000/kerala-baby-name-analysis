require 'active_record'
require 'pry'

class Human < ActiveRecord::Base
  self.table_name = "humans"
end

class AdvancedHuman < ActiveRecord::Base
  self.table_name = "humans"
end

Human.establish_connection(
  adapter: 'sqlite3',
  database: File.dirname(__FILE__) + '/db.sqlite'
)

AdvancedHuman.establish_connection(
  adapter: 'sqlite3',
  database: File.dirname(__FILE__) + '/../../all.sqlite'
)

Human.connection.execute("PRAGMA journal_mode = WAL")
AdvancedHuman.connection.execute("PRAGMA journal_mode = WAL")

if !Human.table_exists?
  Human.connection.create_table :humans do |t|
    t.string :name
    t.string :gender
    t.integer :year
    t.integer :count

    t.index [:gender, :year]
  end
end

if !AdvancedHuman.table_exists?
  AdvancedHuman.connection.create_table :humans do |t|
    t.string :name
    t.string :call_name
    t.string :house_name
    t.string :gender
    t.integer :age
    t.integer :polling_station
    t.string :district
  end
end