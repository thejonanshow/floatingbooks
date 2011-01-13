class Book < ActiveRecord::Base
  validates_uniqueness_of :isbn

end
