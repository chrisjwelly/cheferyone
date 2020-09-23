require 'test_helper'

class ChefsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @chef = chefs(:one)
  end

  test "should get index" do
    get chefs_url, as: :json
    assert_response :success
  end

  test "should create chef" do
    assert_difference('Chef.count') do
      post chefs_url, params: { chef: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show chef" do
    get chef_url(@chef), as: :json
    assert_response :success
  end

  test "should update chef" do
    patch chef_url(@chef), params: { chef: {  } }, as: :json
    assert_response 200
  end

  test "should destroy chef" do
    assert_difference('Chef.count', -1) do
      delete chef_url(@chef), as: :json
    end

    assert_response 204
  end
end
