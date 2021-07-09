class User < ApplicationRecord  
  validates :first_name, presence: true, length: { maximum: 35 }
  has_many :polls, dependent: :destroy

end