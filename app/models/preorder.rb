class Preorder < ApplicationRecord
  belongs_to :menu
  validate :end_after_start
  validate :collection_after_end
  validate :interval_not_overlapping
  validates :start_date, :end_date, :collection_date, :quota, :presence => true
  validates :quota, numericality: { :greater_than => 0 }

  has_many :orders, dependent: :destroy

  def as_json(options = {})
    # Ignore those which have ended ("cancelled")
    ordered_quantity = get_orders_for_quantity.sum(:quantity)
    super(options).merge({
      "ordered_quantity" => ordered_quantity
    })
  end

  def has_started?
    now = DateTime.now
    now >= start_date
  end

  def has_ended?
    now = DateTime.now
    now > end_date
  end

  def get_orders_for_quantity
    ordered_quantity = self.orders.where("orders.status != ? AND orders.status != ?",
      Order.statuses[:ended],
      Order.statuses[:unpaid])
    ordered_quantity
  end

  private
    def end_after_start
      return if end_date.blank? || start_date.blank?
      if end_date < start_date
        errors.add(:end_date, "End date must be after the start date")
      end
    end

    def collection_after_end
      return if collection_date.blank? || end_date.blank?
      if collection_date < end_date
        errors.add(:collection_date, "Collection date must be after the end date")
      end
    end

    def interval_not_overlapping
      return if end_date.blank? || start_date.blank?
      associated_menu = Menu.find(self.menu_id)
      preorders = associated_menu.preorders

      # The id check is necessary. This is because validate is called when you `create` AND `save`.
      # Without the id check, it will "match" itself
      matching_start_preorders = preorders.select{ |preorder| 
        ((preorder.start_date <= self.start_date) && (self.start_date <= preorder.end_date)) && preorder.id != self.id
      }
      if !matching_start_preorders.empty?
        errors.add(:start_date, "Start date must not be overlapping with existing preorders")
      end

      matching_end_preorders = preorders.select{ |preorder| 
        ((preorder.start_date <= self.end_date) && (self.end_date <= preorder.end_date)) && preorder.id != self.id
      }
      if !matching_end_preorders.empty?
        errors.add(:end_date, "End date must not be overlapping with existing preorders")
      end
    end

end
