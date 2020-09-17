class Restaurant < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :logo

  belongs_to :user, touch: true
  has_many :menus, dependent: :destroy

  def get_logo_url
    url_for(self.logo)
  end

  # Append logo to JSON
  def as_json(options)
    super(options).merge({
      "logo_url" => get_logo_url
    })
  end
end
