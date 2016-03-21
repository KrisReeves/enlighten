(function($){
    $.fn.enlighten = function(options) {
        var settings = $.extend({
            itemStep: 3,                    // Item grouping to apply effect - eg. 3 means every 3 items.
            baseColor: "#92a8d1",           // Initial color value - Gets lighter or darker based on colorDirection.
            colorStep: 10,                  // Color change amount.
            colorDirection: 1,              // Lighter(1) or Darker(-1)
            classDecorator: "enlightenRow", // CSS Class name to apply the effect.
            hoverColor: ""                  // Hover color for mouse.  If blank, calculated color is used.
        }, options);
              
        var getRowSelector = function(rowIdx) {
            return "." + settings.classDecorator + ":nth-child(" + settings.itemStep + "n+"+ (rowIdx + 1) + ")";
        };
        
        var getNextColor = function(currentColor){
            return changeColor(currentColor, settings.colorStep * settings.colorDirection);
        };
        
        var getHoverColor = function(){
            return settings.hoverColor ? 
                settings.hoverColor : 
                changeColor(
                    settings.baseColor, 
                    settings.colorStep * -settings.colorDirection * 
                        ((settings.colorDirection < 0) ? settings.itemStep : 1));
        };
        
        var setColorLimits = function(decimalValue){           
            if(decimalValue < 0){
                return 0;
            }
            
            if(decimalValue > 255){
                return 255;
            }
            
            return decimalValue;
        };
        
        var getRGBDecimal = function(val){
            var rgb = {
                "red": 0,
                "green": 0,
                "blue": 0
            };
            
            if(val.indexOf("rgb") > -1){
                rgb = $.extend(rgb, getRGBFromRGB(val));
            }
            
            if(val.indexOf("#") > -1){
                rgb = $.extend(rgb, getRGBFromHex(val));
            }
            
            return rgb;
        };
        
        var getRGBFromRGB = function(val) {
            var rgb = val.substring(val.indexOf("(") + 1, val.length - 1).split(", ");
            return {
                "red": parseInt(rgb[0]),
                "green": parseInt(rgb[1]),
                "blue": parseInt(rgb[2])
            };
        };
        
        var getRGBFromHex = function(val) {
            var rgb = val.substr(val.indexOf("#") + 1);
            return {
                "red": parseInt(rgb.slice(0,2), 16),
                "green": parseInt(rgb.slice(2,4), 16),
                "blue": parseInt(rgb.slice(4,6), 16)
            };
        };
       
        var changeColor = function changeColor(currentColor, changeAmount) {           
            var rgb = getRGBDecimal(currentColor);
                                
            return "#" + 
                pad(setColorLimits(rgb.red + changeAmount).toString(16)) + 
                pad(setColorLimits(rgb.green + changeAmount).toString(16)) + 
                pad(setColorLimits(rgb.blue + changeAmount).toString(16));        
        };
        
        var pad = function(val) {
            return ("00" + val).substr(-2); 
        };

        var currentColor = settings.baseColor;

        // Apply effect to each item.               
        for(var i=0; i < settings.itemStep; i++){   
            var el = $(this).find(getRowSelector(i));
            
            if(el.length > 0){
                el.css("background-color", currentColor);
                currentColor = getNextColor(el.css("background-color"));
            }
        }
        
        $(this).find("." + settings.classDecorator).each(function () {
            var currentColor =  $(this).css("background-color");            
            $(this).hover(function(){
                $(this).css("background-color", getHoverColor());   
            }, function(){
                $(this).css("background-color", currentColor);
            });
        });  
    };
}(jQuery));
