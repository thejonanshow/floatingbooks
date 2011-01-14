class AddCheckedOutToToBooks < ActiveRecord::Migration
  def self.up
    change_table :books do |t|
      t.references :checked_out_to
    end
  end

  def self.down
    change_table :books do |t|
      t.removes :checked_out_to
    end
  end
end
