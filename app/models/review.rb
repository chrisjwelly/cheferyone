class Review < ApplicationRecord
  belongs_to :order
  validates :rating, :inclusion => { :in => 0..5, :message => "Rating should be in the range of 0 to 5"}
  validates :rating, numericality: { only_integer: true }

  def as_json(options = {})
    super(options).merge({
      email: order.user.email
    })
  end
end
