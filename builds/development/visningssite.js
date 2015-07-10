var FontSizeScalerObj = {};

function FontSizeScalerNew(ParentSelector, SelectorClassArr, NativeWindowWidth) {
    console.log("FontSizeScalerObj 1:" + JSON.stringify(FontSizeScalerObj));
    var FontSize;
    if ($.isEmptyObject(FontSizeScalerObj)) { // If the window reloades, then FontSizeScalerObj is empty and therefore store all font-sizes.
        for (var i = 0; i < SelectorClassArr.length; i++) {
            FontSize = $(SelectorClassArr[i]).css("font-size");
            console.log("FontSizeScalerObj FontSize - SelectorClass: " + SelectorClassArr[i] + ", font-size: " + FontSize);
            if (typeof FontSize != 'undefined') // Check in case a CSS-class in SelectorClassArr does not exist:
                FontSizeScalerObj[SelectorClassArr[i]] = parseInt(FontSize.replace(/px/g, ''));
        }
    }

    // Resize all fonts:
    var WindowWidth = $(ParentSelector).width();
    var Ratio = Math.round(1000 * (WindowWidth / NativeWindowWidth)) / 1000; // Rounded to 3 digit precision.
    var ArgStr = SelectorClassArr.join();
    for (var Selector in FontSizeScalerObj) {
        if (ArgStr.indexOf(Selector) !== -1) // Only ajust the fontsizes given in SelectorClassArr:
            $(Selector).css("font-size", String(FontSizeScalerObj[Selector] * Ratio) + "px");
    }
    console.log("FontSizeScalerObj 2:" + JSON.stringify(FontSizeScalerObj));
}