class Order < ApplicationRecord
  STATUSES = %i[unpaid paid confirmed completed ended]
           .freeze
  belongs_to :preorder
  belongs_to :user
  has_one :menu, through: :preorder
  has_one :restaurant, through: :menu
  has_one :review
  enum status: STATUSES
  validate :within_preorder_quota
  validates :quantity, numericality: { :greater_than => 0 }

  def as_json(options = {})
    super(options).merge({
      restaurant_id: restaurant.id,
      email: user.email,
      username: user.username,
      menu: menu
    })
  end

  private
    def within_preorder_quota
      return if quantity.blank?

      # Do not include orders which have ended (cancelled) in the computation
      non_ended_orders = preorder.get_orders_for_quantity

      # Exclude self. Otherwise this will create troubles when updating
      preorder_ordered_quantity = non_ended_orders.where.not(id: id).sum(:quantity)

      max_allowed_quantity = preorder.quota - preorder_ordered_quantity
      if quantity > max_allowed_quantity
        errors.add(:quantity, "Quantity should not be higher than the stock")
      end
    end
end
