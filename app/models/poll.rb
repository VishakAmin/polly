class Poll < ApplicationRecord
  belongs_to :user
  has_many :options, dependent: :destroy
  has_many :responses, dependent: :destroy
  accepts_nested_attributes_for :options
  validates :title, presence: true
end
