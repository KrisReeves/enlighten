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
       
        var changeColor = function changeColor(currentColor, changeAmount) {
            var redDec, blueDec, greenDec;
            
            if(currentColor.indexOf("rgb") > -1){
                currentColor = currentColor.replace("rgb", "");
                currentColor = currentColor.replace("a", "");
                currentColor = currentColor.replace("(", "");
                currentColor = currentColor.replace(")", "");
                var rgb = currentColor.split(",");
                
                redDec =  parseInt(rgb[0].trim());
                blueDec =  parseInt(rgb[1].trim());
                greenDec =  parseInt(rgb[2].trim());
            }
            
            if(currentColor.indexOf("#") > -1){
                currentColor = currentColor.replace("#", "");
                                              
                var redHex = currentColor.slice(0,2);
                var blueHex = currentColor.slice(2,4);
                var greenHex = currentColor.slice(4,6);
                
                redDec =  parseInt(redHex, 16);
                blueDec =  parseInt(blueHex, 16);
                greenDec =  parseInt(greenHex , 16);
            }
                        
            var newRedDec = setColorLimits(redDec + changeAmount);
            var newBlueDec = setColorLimits(blueDec + changeAmount);
            var newGreenDec = setColorLimits(greenDec + changeAmount);         
                        
            var newRedHex = pad(newRedDec.toString(16));
            var newBlueHex = pad(newBlueDec.toString(16));
            var newGreenHex = pad(newGreenDec.toString(16));
            
            return "#" + newRedHex + newBlueHex + newGreenHex;        
        };
        
        var pad = function(val) {
            return ('00' + val).substr(-2); 
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
