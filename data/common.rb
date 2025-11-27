require 'active_record'
require 'pry'

# 1. Establish a connection to SQLite
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db.sqlite'
)

# 2. Define a model class (corresponding to a table)
class Human < ActiveRecord::Base
  self.table_name = "humans"

  enum :district, {thrissur: "thrissur"}
end 

@first_run = !Human.table_exists?

# 3. Create the table (migration-like setup)
if @first_run
  ActiveRecord::Schema.define do
    create_table :humans do |t|
      t.string :name
      t.string :call_name
      t.string :gender
      t.integer :age
      t.string :district
      t.string :local_body
      t.string :ward
      t.string :polling_station
    end
  end
end
