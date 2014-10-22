class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_action :set_user
  
  def index
    @events = Event.all
  end

  def show
  end


  def new
    @event = Event.new
  end

  def create
    @event = @user.events.build(event_params)

    if @event.save
      @event.create_activity :create, owner: current_user, parameters: {title: @event.name, start_time: @event.start_time}
      redirect_to user_profile_path(@user)
    else
      render :new
    end  
  end

  def edit
  end

  def update
    if @event.update(event_params)
      redirect_to user_event_path(@user.id, @event.id), notice: 'Event updated'
    else
      render :edit
    end  
  end

  def destroy

    @event.create_activity :destroy, owner: current_user, parameters: {title: @event.name, start_time: @event.start_time}
    @event.destroy if @event.user == current_user
    redirect_to user_profile_path(@user)
  end

  private
  def event_params
      params.require(:event).permit(:start_time,
                                    :stop_time,
                                    :venue_address,
                                    :venue_name,
                                    :venue_address,
                                    :city_name,
                                    :image_url,
                                    :description,
                                    :category,
                                    :genre, 
                                    :name, 
                                    :rating, 
                                    :website, 
                                    :user_id,
                                    :eventful_id,
                                    :category_list)
    
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end
end
