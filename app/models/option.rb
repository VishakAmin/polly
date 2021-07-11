class Option < ApplicationRecord
  belongs_to :poll
  # has_many :responses, dependent: :destroy
  validates :content, presence: true, length: { maximum: 120 }
end