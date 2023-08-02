export const data2 = [
	{
		"apiName": "WeatherApi",
		"endPointName": "GetCurrentWeather",
		"testName": "Should_ReturnWeather_When_CityNameProvided",
		"request": {
			"path": "/data/2.5/weather",
			"method": "GET",
			"headers": {},
			"queryParams": {
				"q": "London",
				"appid": "API_KEY"
			}
		},
		"response": {
			"status": 200,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"coord\":{\"lon\":-0.1257,\"lat\":51.5085},\"weather\":[{\"main\":\"Clouds\"}],\"main\":{\"temp\":12.48}}"
		}
	},
	{
		"apiName": "WeatherApi",
		"endPointName": "GetCurrentWeather",
		"testName": "Should_CreateWeather_When_NewWeatherDataProvided",
		"request": {
			"path": "/data/2.5/weather",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"city\":\"NewCity\",\"weather\":{\"main\":\"Clear\"},\"main\":{\"temp\":25.0}}"
		},
		"response": {
			"status": 201,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"id\":123456,\"cod\":201}"
		}
	},
	{
		"apiName": "WeatherApi",
		"endPointName": "GetCurrentWeather",
		"testName": "Should_UpdateWeather_When_ExistingWeatherDataProvided",
		"request": {
			"path": "/data/2.5/weather/123456",
			"method": "PUT",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"weather\":{\"main\":\"Rain\"},\"main\":{\"temp\":22.0}}"
		},
		"response": {
			"status": 200,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"id\":123456,\"cod\":200}"
		}
	},
	{
		"apiName": "WeatherApi",
		"endPointName": "GetCurrentWeather",
		"testName": "Should_DeleteWeather_When_WeatherIdProvided",
		"request": {
			"path": "/data/2.5/weather/123456",
			"method": "DELETE",
			"headers": {},
			"body": ""
		},
		"response": {
			"status": 204,
			"headers": {},
			"body": ""
		}
	},
	{
		"apiName": "WeatherApi",
		"endPointName": "GetCurrentSeason",
		"testName": "Should_ReturnSeason_When_CityNameProvided",
		"request": {
			"path": "/data/2.5/season",
			"method": "GET",
			"headers": {},
			"queryParams": {
				"q": "London",
				"appid": "API_KEY"
			}
		},
		"response": {
			"status": 200,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"season\":\"Spring\"}"
		}
	},
	{
		"apiName": "MovieApi",
		"endPointName": "GetMovieDetails",
		"testName": "Should_ReturnMovieDetails_When_MovieIdProvided",
		"request": {
			"path": "/api/movies/123",
			"method": "GET",
			"headers": {},
			"queryParams": {}
		},
		"response": {
			"status": 200,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"id\":123,\"title\":\"MovieTitle\",\"genre\":\"Action\"}"
		}
	},
	{
		"apiName": "MovieApi",
		"endPointName": "CreateMovie",
		"testName": "Should_CreateMovie_When_NewMovieDataProvided",
		"request": {
			"path": "/api/movies",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"title\":\"NewMovie\",\"genre\":\"Drama\"}"
		},
		"response": {
			"status": 201,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"id\":456,\"title\":\"NewMovie\",\"genre\":\"Drama\"}"
		}
	},
	{
		"apiName": "MovieApi",
		"endPointName": "UpdateMovie",
		"testName": "Should_UpdateMovie_When_ExistingMovieDataProvided",
		"request": {
			"path": "/api/movies/123",
			"method": "PUT",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"title\":\"UpdatedMovie\",\"genre\":\"Sci-Fi\"}"
		},
		"response": {
			"status": 200,
			"headers": {
				"Content-Type": "application/json"
			},
			"body": "{\"id\":123,\"title\":\"UpdatedMovie\",\"genre\":\"Sci-Fi\"}"
		}
	},
	{
		"apiName": "MovieApi",
		"endPointName": "DeleteMovie",
		"testName": "Should_DeleteMovie_When_MovieIdProvided",
		"request": {
			"path": "/api/movies/123",
			"method": "DELETE",
			"headers": {},
			"body": ""
		},
		"response": {
			"status": 204,
			"headers": {},
			"body": ""
		}
	},
	{
		"apiName": "CARTOON",
		"endPointName": "GetAll_Cartoons",
		"testName": "Test One ",
	}
]
