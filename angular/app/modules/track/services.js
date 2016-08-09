var services = angular.module('Track.services', [])

/**
* 	methods for operating on charts
* 	as well as storage for chart configs
**/
.factory('ChartService', ['DataService', function(DataService){
	return {
		charts: [],
		refreshCharts: function(dataName){

			this.currentData = DataService[dataName];

			for(var i = 0; i < this.charts.length; i++){
				if(!angular.element(this.charts[i][0]).scope()){

					continue;
				}

				angular.element(this.charts[i][0]).scope().refresh();

			}
		},
		employChart: function(chart){
			this.charts.push(chart);
		},


		getBarConfig: function(){

			var data = this.currentData;
				categories = [],
				series     = [];

				//Goal: build categories list (countries)
				//iterate through list of countries
			for(var x = 0; x < data.length; x++){
				var entry = data[x];

				categories.push(entry["Country Name"]);

			}
				//Goal:build series list (out of each possible year)
				//iterate through single country
				//to build series year list
			for(var p in data[0]){
				var value = data[0][p];

				if(typeof value == 'number'){
					var seriesObj = {
						name: p.substring(0, 4),
						data: []

					};

					series.push(seriesObj);
				}
			}

			//Goal: build GDP data points per year
			//iterate through newly created series obj
			for(var i = 0; i < series.length; i++){
				var seriesObj = series[i],
						 year = seriesObj.name;

						 //for every series obj, iterate through the countries
						 //and grab their gdp values pertaining to the year we are iterating
						 //(which equals i)
						 for(var c = 0; c < data.length; c++){
						 	var country = data[c],
						 		countryGDP = country[year + " " + "[YR" + year + "]"];

						 		seriesObj.data.push(countryGDP);
						 }

			}

			return {
			
			        options: {
			            chart: {
			            	type:'bar'
			            }

		        },
		        title: {
		            text: ' '
		        },
		        subtitle: {
		            text: ' '
		        },
		        xAxis: {
		            categories: categories,
		            title: {
		                text: null
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '$USD (trillions)',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify'
		            }
		        },
		        tooltip: {
		            valueSuffix: 'trillions'
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true
		                }
		            }
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            x: -40,
		            y: 80,
		            floating: true,
		            borderWidth: 1,
		            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		            shadow: true
		        },
		        credits: {
		            enabled: false
		        },
		        series: series

    };
		},

		getPieConfig: function(){
			var data       = this.currentData,
		   		seriesData = [];

		   		for(var i = 0; i < data.length; i++){
		   			var country = data[i],
		   				countryProps = Object.keys(country),
		   				lastProperty = countryProps[countryProps.length - 1];

			   		seriesData.push({
			   			name: country["Country Name"],
			   			y: country[lastProperty]
			   		});
		   		}

			return {
			
			        options: {
			            chart: {
			            	type:'pie'
			            }

		        },	

        title: {
            text: ' '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Countries',
            colorByPoint: true,
            data: seriesData
        }]
        };

		},

		getSplineConfig: function(){

			return {
			
			        options: {
			            chart: {
			            	type:'spline'
			            }

		        },	

        title: {
            text: 'Atmosphere Temperature by Altitude'
        },
        subtitle: {
            text: 'According to the Standard Atmosphere Model'
        },
        xAxis: {
            reversed: false,
            title: {
                enabled: true,
                text: 'Altitude'
            },
            labels: {
                formatter: function () {
                    return this.value + 'km';
                }
            },
            maxPadding: 0.05,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            labels: {
                formatter: function () {
                    return this.value + '\xB0';
                }
            },
            lineWidth: 2
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x} km: {point.y}°C'
        },
        plotOptions: {
            spline: {
                marker: {
                    enable: false
                }
            }
        },
        series: [{
            name: 'Temperature',
            data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
        }]
    };
    }
}
}])

/**
* 	methods for handling our data sources
**/
.factory('DataService', ['$q', '$http', function($q, $http){
	return {

		getGDPTotal: function(){
			var defer = $q.defer();
				self = this;

			$http({
				'method': 'GET',
				'url':'assets/gdp-data-total.json'
			}).then(function(response){
				self.gdpTotal = response.data;
				defer.resolve();
			});

			return defer.promise;

		},

		setCustom: function(country){
			this.custom = [country];

		}

	}
}]);