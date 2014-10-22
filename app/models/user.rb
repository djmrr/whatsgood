class User < ActiveRecord::Base
  has_many :categorizations
  has_many :categories, through: :categorizations
  has_many :events, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable

  geocoded_by :address   # can also be an IP address
  after_validation :geocode, :if => :address_changed?         # auto-fetch coordinates

  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode  # auto-fetch address

  acts_as_follower
  acts_as_followable

  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/icon-user-default.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates_attachment_size :avatar, :less_than => 5.megabytes

  def can_edit_user?(user)
    self == user || self.is_admin
  end  

  def self.from_omniauth(auth)
    where("email = ? OR provider = ? AND uid = ? ", auth.info.email, auth.provider, auth.uid).first_or_create do |user|
      user.provider = auth.provider 
      user.uid      = auth.uid
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.email = auth.info.email
      #avatar photo
      r = open(auth.info.image)
      bytes = r.read
      img = Magick::Image.from_blob(bytes).first
      fmt = img.format
      data=StringIO.new(bytes)
      data.class.class_eval { attr_accessor :original_filename, :content_type }
      data.original_filename = Time.now.to_i.to_s+"."+fmt
      data.content_type='image.jpeg'
      user.avatar = data

      user.save
    end
  end

  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session["devise.user_attributes"], without_protection: true) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end   
  end

  def password_required?
    super && provider.blank?
  end

  def update_with_password(params, *options)
    if encrypted_password.blank?
      update_attributes(params, *options)
    else
      super
    end
  end
end
