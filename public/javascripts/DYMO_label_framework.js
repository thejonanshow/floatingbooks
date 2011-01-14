//----------------------------------------------------------------------------
//
//  $Id: DYMO.Label.Framework.js 11890 2010-05-17 00:16:48Z vbuzuev $ 
//
// Project -------------------------------------------------------------------
//
//  DYMO Label Framework
//
// Content -------------------------------------------------------------------
//
//  DYMO Label Framework JavaScript Library
//
//----------------------------------------------------------------------------
//
//  Copyright (c), 2010, Sanford, L.P. All Rights Reserved.
//
//----------------------------------------------------------------------------

/*
    This module provides as access to DYMO Label Framework from a web browser.
    The module provides browser-independent way to easily print labels.
    Currently supported browsers:
        - Firefox 2+, IE 6+, 64-bit IE, Chrome 4, Safari 4, Opera 10 on Windows
        - Safari 3+ (2+ ?) on Mac



 *  This module defines the namespace dymo.label.framework
    
    Following constants are defined in the namespace:
    
    VERSION - the library's version number. Current version is "1.0" 

    Following functions are defined in the namespace:

    /// Gets information about the browser support by the library
    /// Returns object with following properties
    ///     isBrowserSupported - true if browser is supported on current platform, false othewise
    ///     isFrameworkInstalled - true if the framework (or DYMO Label) is installed on the client machine
    ///     errorDetails - empty string if no error detected; error message otherwise
    function checkEnvironment()
    {
        var result = 
        {
            isBrowserSupported: false,
            isFrameworkInstalled: false,
            errorDetails: ""
        }

    
    // returns all printers supported by the DYMO Label Framework
    // printers are returned in array-like object that is an associative-array with printer name as a key as well
    // each printer object has following properties:
    // printerType - either "LabelWriterPrinter" or "TapePrinter"
    // name - printer's name (print queue name on Mac)
    // modelName - printer model/driver name
    // isConnected - is printer connected to computer or not. Note: currently properly returned only for local USB-connected printers on Windows
    // isLocal - is printer local USB-connected or shared network printer. Note: currently works on Windows only. 
    // isTwinTurbo - is printer "LabelWriter Twin Turbo" (has two rolls). Note: the property only defined if printerType is "LabelWriterPrinter"
    // isAutoCutSupported - is Auto-Cut feature supported by the printer. Note: the property only defined if printerType is "TapePrinter"
    function getPrinters()



    // loads label content from a file or URL
    // There are some considerations should be taken into account before using this function.
    // Use it only then there are no other way to load label data, that in most cases should be done using openLabelXml()
    // - full file name/url should be specified. The function will not honor relative pathes based on document.location.href
    // - the fileName can be http:// or file:// urls. On Windows it can be a regular file name, like 'c:\users\desktop\address.label' 
    // - the content of the label will be loaded synchronously. So if the remote server is down there will be a timeout.
    // - any local file can be accessed/tried to be accessed. The function is not limited by any browser restrictions. 
    //   Though only a valid label file (according to label.xsd schema) can be loaded this still can be potential security concern.
    // - the URL is not limited to same-site-origin browser policy - any url can be opened
    // - the proxy settings are system default settings, not nessesary browser settings. 
    // returns Label object provides label manipulation methods
    function openLabelFile(fileName)
    
    
     
    // loads label content from xml stream/string
    // labelXml - label definition as xml string
    // Note: it is a preferable way to load/open label files. Use XMLHttpRequest() or other standard browser methods to get xml string.
    // returns Label object
    function openLabelXml(labelXml)

    

    // Prints one or multiple labels
    // printerName - the printer to print on. A list of printers can be obtained by getPrinters()
    // printParamsXml - printing parameters, like number of copies, print quality, etc. See PrintParams.xsd
    // labelXml - label to print
    // labelSetXml - LabelSet to print. LabelSet is used to print multiple labels with same layout but different data, e.g. multiple addresses.
    //               Use LabelSetBuilder class to create a LabelSet or construct xml manualy according to LabelSet.xsd
    // Returns void
    function printLabel(printerName, printParamsXml, labelXml, labelSetXml)           

              
              
    // Creates a label raster image that can be used for label previewing
    // Params:
    // - labelXml - label to preview
    // - renderParamsXml - rendering parameters, like shadow depth, label color, etc. See LabelRenderParams.xsd
    // - printerName - printer name the preview is generated for. Thhe preview/output cna be different on different printers,
    //                 especially on tape printers with different print head size.
    //                 An empty string can be passed if it does not matter or important on whitch printer the label will be printed.
    //                 In this case a default printer metrics will be used - that is LW400 for LabelWriter printers and LW400 DUO Tape for tape printers
    // Returns a string that is base64-encoded png stream of the label image. This string can be used as data: url for <img> element.
    // Note: data: urls are not supported by IE6 and IE7. IE8 supports them with the 32KB limit (so it might be not possible to preview 'large' labels)
    function renderLabel(labelXml, renderParamsXml, printerName)                  
    

    // Loads an image from url/file and returns it as base64-encoded png stream. The loaded image is not nessesary in PNG format itself.
    // It can be of an yformat supported by the Framework (by DYMO Label Software 8). The loaded data can be used to set 
    // conent for image object on a label. 
    // Note: the same comments as for openLabelFile() is applied to this function as well
    // Returns a string that is base64-encoded png stream of the image. 
    function loadImageAsPngBase64(imageUri)
    
    
    // Creates an xml string suitable to be passed to printLabel() function as printParamsXml parameter
    // Created printing parameters are for printing on LabelWriter printers
    // Parameters:
    // - params - an JavaScript object with following properties (not all properties have to be defined, if a property is not defined a default value will be used)
    //      params.copies - number of copies to print
    //      params.jobTitle - print job title/description
    //      params.flowDirection - prints label content as left-to-right or right-to-left. Use FlowDirection enum to specify the value
    //      params.printQuality - printing quality. Use LabelWriterPrintQuality enum to specify the value
    //      params.twinTurboRoll - the roll to print on if the printer is TwinTurbo. Use TwinTurboRoll enum to specify the value
    // Returns xml string
    function createLabelWriterPrintParamsXml(params)
    
    
    
    // Creates an xml string suitable to pass to printLabel() function as printParamsXml parameter
    // Created printing parameters are for printing on Tape printers
    // Parameters:
    // - params - an JavaScript object with following properties (not all properties have to be defined, if a property is not defined a default value will be used)
    //      params.copies - number of copies to print
    //      params.jobTitle - print job title/description
    //      params.flowDirection - prints label content as left-to-right or right-to-left use FlowDirection enum to specify values
    //      params.alignment - label alignment on the tape. Use TapeAlignment enum to specify the value.
    //      params.cutMode - cut mode if auto-cut is supported by the printer. Use TapeCutMode enum to specify the value. 
    // Returns xml string
    function createTapePrintParamsXml(params)

    

    // Creates an xml string suitable to pass to renderLabel() function as renderParamsXml parameter
    // Parameters:
    // - params - an JavaScript object with following properties (not all properties have to be defined, if a property is not defined a default value will be used)
    //      params.labelColor - color of the label. labelColor is an object with properties 'a' or 'alpha' to specify color's alpha channel, r/red, g/green, b/blue for red, green, blue channels
    //                          The valid range for a/r/g/b fields is [0..255]
    //      params.shadowColor - color of label shadow
    //      params.shadowDepth -  shadow width in TWIPS. if '0' is specified no shadow is rendered
    //      params.flowDirection - prints label content as left-to-right or right-to-left use FlowDirection enum to specify values
    //      params.pngUseDisplayResolution - if true, the png will be generated using display resolution, othewise using printer resolution. 
    //                                       If a display resolution is used the resulting png will be smaller. 
    //                                       Use printer resolution if resulting image is going to be zoomed, so the zoomed preview will have better quality.   
    // Returns xml string
    function createLabelRenderParamsXml(params)

     
    /////////////////////////////////////////////////////////
    // Enums
    /////////////////////////////////////////////////////////

    Following 'enumerations' are defined in the namespace. It is absolutely OK to use real string values instead of enums members.
    THe only difference is with enums mambers you will get an error earlier if the values is misspelled.  
    

    // Specifies how objects and object text are laid down on the label. For Middle East labels/content specify RightToLeft, otherwise "LeftToRight" (default)
    var FlowDirection =
    {
        LeftToRight: "LeftToRight",
        RightToLeft: "RightToLeft"
    };

    // Specifies printing quality when printed on LabelWriter printers
    // 'Text' - text print quality (fast)
    // 'BarcodeAndGraphics' - barcode and images print quality (slow)
    // 'Auto' - automatically determines the print quality based on objects on the label
    var LabelWriterPrintQuality =
    {
        Auto: "Auto",
        Text: "Text",
        BarcodeAndGraphics: "BarcodeAndGraphics"
    };

    // Specifies on whitch roll to print when printing on Twin Turbo printers
    // Left - print on left roll only
    // Right - print on right roll only
    // Auto - continue printing on a different roll when current roll is out of paper. Note: it does not guarantee on whitch roll it will start printing. it can be both left or right.
    var TwinTurboRoll =
    {
        Auto: "Auto",
        Left: "Left",
        Right: "Right"
    };

    // Specifies tape's leader and trailer on a label when printing on Tape printer
    // Center - 10mm leader and trailer
    // Left - 6mm leader, 10mm trailer
    // Right - 10mm leader, 6mm trailer
    var TapeAlignment =
    {
        Center: "Center",
        Left: "Left",
        Right: "Right"
    };

    // Specifies how tape is cut between label when printing multiple labels on Tape printers.
    // Note: it affects multiple pages print jobs only, if one page job is printed the tape is always cut.
    // AutoCut - cut tape between pages
    // ChainMarks - draw a mark between pages
    var TapeCutMode =
    {
        AutoCut: "AutoCut",
        ChainMarks: "ChainMarks"
    };

    // Specifies when to draw Intellegent-Mail barcode for address object
    // AboveAddress - print barcode above the address
    // BelowAddress - print barcode below the address
    // Suppress - don't print barcode as all
    var AddressBarcodePosition =
    {
        AboveAddress: "AboveAddress",
        BelowAddress: "BelowAddress",
        Suppress: "Suppress"
    };    

    //////////////////////////////////////
    // Classes
    //////////////////////////////////////

    //////////////////////////////////////
    // Label class
    //////////////////////////////////////
    Label class is a pseudo-class, because there is no constructor function for it. An instance of this class is 
    returned by openLabelFile() and openLabelXml() functions. The class provides methods to manipulate label content,
    e.g. set address or text on the label.
    
    Label class methods:
    
    // Returns current label xml as a string
    // the returned xml can be passed to functions accepts label xml as a parameter
    // or can be used to direct content manipulations not currently supported by the Framework 
    function getLabelXml()
    
    //Creates a label raster image that can be used for label previewing
    // This function is similar to renderLabel() described above
    function render(renderParamsXml, printerName)
    
    // Prints the label. Similar to dymo.label.framework.printLabel()
    // This function is similar to printLabel() described above
    function print(printerName, printParamsXml, labelSetXml)    


    // returns an array of object's names on the label
    function getObjectNames()
    
    // returns the number of address objects on the label
    function getAddressObjectCount()
        
    // Returns IntellegentMail barcode position for an Address object
    // Parameters:
    //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
    // Returns a string with one of values defined by AddressBarcodePosition 'enumeration'
    function getAddressBarcodePosition(addressIndex)
        
    // Set IntelegentMail barcode position for an Address object
    // Parameters:
    //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
    //      bacodePosition - one of barcode position defined in dymo.label.framework.AddressBarcodePosition 
    // Returns void 
    function setAddressBarcodePosition(addressIndex, barcodePosition)
        
    // Returns text content of an Address object
    // Parameters:
    //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
    // Returns string contains plain text from the Address object
    function getAddressText(addressIndex)        
        

    // Set text content of an Address object
    // Parameters:
    //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
    //      text - plain text string contain the content. Note: current text formatting is remained on line-by-line basis  
    function setAddressText(addressIndex, text)

    // Returns 'text' content of an object
    // The content depends on object type:
    //  - for Address and Text objects it is object's text without formatting
    //  - for Barcode object it is barcode string
    //  - for Image it is base64-encoded string on image's png stream (only if image data is embedded with the label, not linked to url/file)
    //  - for CircularText it is object's text
    //  - for other objects it is an empty string
    function getObjectText(objectName)


    // sets text content for an object. Depends on object's type the content and/or text formatitng are set differently:
    //  - for Address the formatting is applied on line-by-line basis (using <LineFonts> list)
    //  - for text the formatting of current first character is used for the whole text 
    //  - for Barcode object it is barcode string
    //  - for Image it is base64-encoded string of image's png stream
    //  - for CircularText it is object's text
    //  - for DateTime and Counter object it is object's PreText
    //  - for other objects an empty string is returned
    // Parameters:
    //      objectName - object name
    //      text - plain text string for new object content
    function setObjectText(objectName, text)



    //////////////////////////////////////
    // LabelSetBuilder class
    //////////////////////////////////////

    // LabelSetBuilder is used to create a label-set to print multiple labels in one print job. 
    // LabelSet is a collection of records. Each record contains pairs of object name and object text data/content.
    // The data of each record are applied to all corresponend objects and for each record one label is printed.  

    LabelSetBuilder's methods:
    
    // Adds a new record to the label-set
    // Returns created LabelSetRecord object 
    function addRecord()
    
    // Convert record objects into xml format defined in LabelSet.xsd
    // Returned xml can be passed to dymo.label.framefork.printLabel() as labelSetXml parameter.
    // Parameters:
    //      records - records to convert to xml. records should be array-like object of associative-arrays with object names as keys and object text as values.
    // Return string contains xml data
    // Note: this 'static' function can be used independed of other LabelSetBuilder methods if records data is generated by other functions  
    LabelSetBuilder.toXml = function(records)    


    // Converts the builder's content to an xml string to be passed to printLabel()
    function toString()


    //////////////////////////////////////
    // LabelSetRecord class
    //////////////////////////////////////

    // LabelSetRecord holds data of one label-set record and provides methods to add data to the record.
    // Note: there is no assessable constructor function for this class. Instances are created and returned by addRecord() method of LabelSetBuilder class

    // Methods:
    
    // Adds data to the record specified as text markup
    // Parameters:
    //      objectName - object name which the markup is set for
    //      textMarkup - markup string. See TextMarkup.xsd 
    function setTextMarkup(objectName, textMarkup)
    
    // Adds data to the record specified as plain text
    // Parameters:
    //      objectName - object name which text is set for
    //      text - text string 
    function setText(objectName, text)

    // Adds image data to the record.
    // Parameters:
    //      objectName - name of image object the data is set for
    //      base64Image - string contains base64-encoded png image stream
    function setBase64Image(objectName, base64Image)





*/


// create namespace
var dymo;
if (!dymo) dymo = {};
else if (typeof dymo != "object")
    throw new Error("dymo already exists and is not an object");

if (!dymo.label) dymo.label = {}
else if (typeof dymo.label != "object")
    throw new Error("dymo.label already exists and is not an object");

if (!dymo.label.framework) dymo.label.framework = {}
else if (typeof dymo.label.framework != "object")
    throw new Error("dymo.label.framework already exists and is not an object");

dymo.label.framework.VERSION = "1.0";

// initialize everything inside a closure
// then export what is needed
(function()
{
    ///////////////////////////////////////////////////////////////////
    // Xml utils
    ///////////////////////////////////////////////////////////////////

    // Xml utils
    // most functions are slitly modified samples from 
    // "JavaScript: The Definitive Guide, Fifth Edition" book by David Flanagan
    var Xml = {};

    // Parse the XML document contained in the string argument and return
    // a Document object that represents it.
    Xml.parse = function(text)
    {
        if (typeof DOMParser != "undefined")
        {
            // Mozilla, Firefox, and related browsers
            return (new DOMParser()).parseFromString(text, "application/xml");
        }
        else if (typeof ActiveXObject != "undefined")
        {
            // Internet Explorer.
            var doc = new ActiveXObject("MSXML2.DOMDocument");  // Create an empty document
            doc.loadXML(text);            // Parse text into it
            return doc;                   // Return it
        }
        else
        {
            // As a last resort, try loading the document from a data: URL
            // This is supposed to work in Safari.  Thanks to Manos Batsis and
            // his Sarissa library (sarissa.sourceforge.net) for this technique.
            var url = "data:text/xml;charset=utf-8," + encodeURIComponent(text);
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            return request.responseXML;
        }
    };

    Xml.serialize = function(node)
    {
        if (typeof XMLSerializer != "undefined")
            return (new XMLSerializer()).serializeToString(node);
        else if (node.xml)
            return node.xml;
        else
            throw new Error("XML.serialize is not supported or can't serialize " + node);
    };

    // appends a new element to DOM tree as child of parent and set it content to text
    // parent - parent Element
    // tagName - the element's tagName
    // text - the element's content
    // attributes - tag attibutes, specified as an associative-array
    // returns - new added element
    Xml.appendElement = function(parentElement, tagName, text, attributes)
    {
        var result = parentElement.ownerDocument.createElement(tagName);

        if (text)
            result.appendChild(parentElement.ownerDocument.createTextNode(text));

        if (attributes)
        {
            for (var a in attributes)
                result.setAttribute(a, attributes[a]);
        }

        parentElement.appendChild(result);

        return result;
    }

    // returns text content of the element, e.g. for tag <Name>address123</Name>, 'address123' will be returned
    Xml.getElementText = function(elem)
    {
        if (!elem)
            return "";

        var result = "";
        for (var i = 0; i < elem.childNodes.length; i++)
            if (elem.childNodes[i].nodeType == 3) //TEXT_NODE
            result = result + elem.childNodes[i].data;

        return result;
    }

    // set text content of the elem. Note: all other children of the element will be deleted
    // element - element to set text
    // text - text string to set
    Xml.setElementText = function(element, text)
    {
        // first, remove all children...
        Xml.removeAllChildren(element);

        // ...then add text
        element.appendChild(element.ownerDocument.createTextNode(text));
    }

    // removes all children nodes of the specified node
    Xml.removeAllChildren = function(node)
    {
        while (node.firstChild)
            node.removeChild(node.firstChild);
    }

    /**
    * XML.XPathExpression is a class that encapsulates an XPath query and its
    * associated namespace prefix-to-URL mapping.  Once an XML.XPathExpression
    * object has been created, it can be evaluated one or more times (in one
    * or more contexts) using the getNode() or getNodes() methods.
    *
    * The first argument to this constructor is the text of the XPath expression.
    * 
    * If the expression includes any XML namespaces, the second argument must
    * be a JavaScript object that maps namespace prefixes to the URLs that define
    * those namespaces.  The properties of this object are the prefixes, and
    * the values of those properties are the URLs.
    */
    Xml.XPathExpression = function(context, xpathText, namespaces)
    {
        this.xpathText = xpathText;    // Save the text of the expression
        this.namespaces = namespaces;  // And the namespace mapping

        // We need the Document object to call createExpression
        var doc = context.ownerDocument;
        // If the context doesn't have ownerDocument, it is the Document
        if (doc == null)
            doc = context;

        if (doc.createExpression)
        {
            // If we're in a W3C-compliant browser, use the W3C API to compile the text of the XPath query
            this.xpathExpr = doc.createExpression(xpathText,
            // This function is passed a 
            // namespace prefix and returns the URL.
                                          function(prefix)
                                          {
                                              return namespaces[prefix];
                                          });
        }
        else
        {
            // Otherwise, we assume for now that we're in IE and convert the
            // namespaces object into the textual form that IE requires.
            this.namespaceString = "";
            if (namespaces != null)
            {
                for (var prefix in namespaces)
                {
                    // Add a space if there is already something there
                    if (this.namespaceString) this.namespaceString += ' ';
                    // And add the namespace
                    this.namespaceString += 'xmlns:' + prefix + '="' +
                        namespaces[prefix] + '"';
                }
            }
        }
    };

    /**
    * This is the getNodes() method of XML.XPathExpression.  It evaluates the
    * XPath expression in the specified context.  The context argument should
    * be a Document or Element object.  The return value is an array 
    * or array-like object containing the nodes that match the expression.
    */
    Xml.XPathExpression.prototype.getNodes = function(context)
    {
        if (this.xpathExpr)
        {
            // If we are in a W3C-compliant browser, we compiled the
            // expression in the constructor.  We now evaluate that compiled
            // expression in the specified context
            var result =
                this.xpathExpr.evaluate(context,
            // This is the result type we want
                                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                        null);

            // Copy the results we get into an array.
            var a = new Array(result.snapshotLength);
            for (var i = 0; i < result.snapshotLength; i++)
            {
                a[i] = result.snapshotItem(i);
            }
            return a;
        }
        else
        {
            // If we are not in a W3C-compliant browser, attempt to evaluate
            // the expression using the IE API.
            try
            {
                // We need the Document object to specify namespaces
                var doc = context.ownerDocument;
                // If the context doesn't have ownerDocument, it is the Document
                if (doc == null) doc = context;

                // This is IE-specific magic to specify prefix-to-URL mapping
                //doc.setProperty("SelectionLanguage", "XPath");
                //doc.setProperty("SelectionNamespaces", this.namespaceString);
                // vb: setProperty() fails on IE8
                try { doc.setProperty("SelectionLanguage", "XPath"); } catch (e) { }
                try { doc.setProperty("SelectionNamespaces", this.namespaceString); } catch (e) { }


                // In IE, the context must be an Element not a Document, 
                // so if context is a document, use documentElement instead
                if (context == doc) context = doc.documentElement;
                // Now use the IE method selectNodes() to evaluate the expression
                var result = context.selectNodes(this.xpathText);

                // in IE8 the result is INodeSelection, not nodes themselves
                // 
                var a = new Array(result.length);
                for (var i = 0; i < result.length; i++)
                {
                    a[i] = result[i];
                }
                return a;

            }
            catch (e)
            {
                // If the IE API doesn't work, we just give up
                throw "XPath not supported by this browser.: " + e;
            }
        }
    }


    /**
    * This is the getNode() method of XML.XPathExpression.  It evaluates the
    * XPath expression in the specified context and returns a single matching
    * node (or null if no node matches).  If more than one node matches,
    * this method returns the first one in the document.
    * The implementation differs from getNodes() only in the return type.
    */
    Xml.XPathExpression.prototype.getNode = function(context)
    {
        if (this.xpathExpr)
        {
            var result = this.xpathExpr.evaluate(
                context,
            // We just want the first match
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null);
            return result.singleNodeValue;
        }
        else
        {
            try
            {
                var doc = context.ownerDocument;
                if (doc == null) doc = context;

                try { doc.setProperty("SelectionLanguage", "XPath"); } catch (e) { }
                try { doc.setProperty("SelectionNamespaces", this.namespaceString); } catch (e) { }

                if (context == doc) context = doc.documentElement;
                // In IE call selectSingleNode instead of selectNodes
                return context.selectSingleNode(this.xpathText);
            }
            catch (e)
            {
                throw "XPath not supported by this browser.: " + e;
            }
        }
    };

    // A utility to create an XML.XPathExpression and call getNodes() on it
    Xml.getNodes = function(context, xpathExpr, namespaces)
    {
        namespaces = namespaces || null;
        return (new Xml.XPathExpression(context, xpathExpr, namespaces)).getNodes(context);
    };

    // A utility to create an XML.XPathExpression and call getNode() on it
    Xml.getNode = function(context, xpathExpr, namespaces)
    {
        namespaces = namespaces || null;
        return (new Xml.XPathExpression(context, xpathExpr, namespaces)).getNode(context);
    };


    // checks is browser enviroment suitable for the framework
    function checkEnvironment()
    {
        var result = 
        {
            isBrowserSupported: false,
            isFrameworkInstalled: false,
            errorDetails: ""
        }

        var platform = navigator.platform;
        if (platform.indexOf("Win") != -1)
        {
            // on Windows IE and Firefox are only supported
            if (typeof ActiveXObject != "undefined") //IE
            {
                result.isBrowserSupported = true;
                try
                {
                    var framework = new ActiveXObject("DYMOLabelFrameworkIEPlugin.Plugin");
                    if (typeof framework != "object")
                        result.errorDetails = "Unable to create DYMO.Label.Framework ActiveX object. Check that DYMO.Label.Framework is installed";
                    else
                        result.isFrameworkInstalled = true;
                }
                catch(e)
                {
                    result.errorDetails = "Unable to create DYMO.Label.Framework ActiveX object. Check that DYMO.Label.Framework is installed. Exception details: " + e;
                }

            }
            /*
            else if (navigator.userAgent.indexOf("Firefox") != -1)
            {
                result.isBrowserSupported = true;
                if (typeof DymoLabelFrameworkXpCom != "undefined")
                {
                    try
                    {
                        var framework = new DymoLabelFrameworkXpCom();
                        if (framework.internal_isInitialized())
                            result.isFrameworkInstalled = true;
                        else
                            result.errorDetails = "Unable to initialize DymoLabelFrameworkXpCom object. Check that DYMO.Label.Framework is installed";
                    }
                    catch (e)
                    {
                        result.errorDetails = "Unable to create DymoLabelFrameworkXpCom object. Check that DYMO.Label.Framework is installed. Exception info: " + e;
                    }
                }
                else
                    result.errorDetails = 'DYMO Label Framework Firefox extension is not installed';
            }
            */
            else //if (navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf("Safari") != -1)
            {
                result.isBrowserSupported = true;
                
                //enum installed plugin to find dymo one
                var pluginFound = false;
                for (var i = 0; i < navigator.plugins.length; ++i)
                {
                    var plugin = navigator.plugins[i];
                    // enum mimi types supportd by plugin
                    for (var j = 0; j < plugin.length; ++j)
                    {
                        if (plugin[j].type == "application/x-dymolabel")
                        {
                            pluginFound = true;
                            break;
                        }
                    }
                    if (pluginFound) 
                        break;    
                } 
                
                if (pluginFound)
                    result.isFrameworkInstalled = true;
                else
                    result.errorDetails = 'DYMO Label Framework Plugin is not installed';
                
             }
             //else
             //   result.errorDetails = 'The supported browsers on Windows are Internet Explorer, Firefox, and Chrome';

        }
        else if (platform.indexOf("Mac") != -1)
        {
            if (navigator.userAgent.indexOf("Safari") != -1 && navigator.vendor.indexOf("Apple") != -1)
            {
                result.isBrowserSupported = true;
                
                //enum installed plugin to find dymo one
                var pluginFound = false;
                for (var i = 0; i < navigator.plugins.length; ++i)
                {
                    var plugin = navigator.plugins[i];
                    // enum mimi types supportd by plugin
                    for (var j = 0; j < plugin.length; ++j)
                    {
                        if (plugin[j].type == "application/x-dymolabel")
                        {
                            pluginFound = true;
                            break;
                        }
                    }
                    if (pluginFound) 
                        break;    
                } 
                
                if (pluginFound)
                {
                    // check version, should be at least 2.0
                    var safariPlugin = _createSafariPlugin();
                    if (safariPlugin.GetAPIVersion() >= "2.0")
                            result.isFrameworkInstalled = true;
                    else
                        result.errorDetails = 'DYMO Label Safari Plugin is installed but outdated. Install latest version.';
                }
                else
                    result.errorDetails = 'DYMO Label Safari Plugin is not installed';
                
            }
            else
                result.errorDetails = 'The only supported browser on Mac is Safari';
        }
        else
            result.errorDetails = "The operating system is not supported";

        return result;
    }

    // adds a hidden element to load DYMO Safari plugin
    // returns js object represent the plugin
    function _createSafariPlugin()
    {
        var pluginId = '_DymoLabelFrameworkJslSafariPlugin';
                
        if (!document.getElementById(pluginId))
        {
            // try to create Safari Plugin as <embed> control
            var safariPlugin = document.createElement("embed");
            safariPlugin.type = "application/x-dymolabel";
            safariPlugin.id = pluginId;
            safariPlugin.width = 1;
            safariPlugin.height = 1;
            safariPlugin.hidden = true;

            // it is important to add it to the DOM
            // otherwise _DymoLabelFrameworkJslSafariPlugin is unavailable and 
            // it is impossible to call plug-in methods
            document.body.appendChild(safariPlugin);
        }
        
        return _DymoLabelFrameworkJslSafariPlugin;
    }

    // adds a hidden element to load DYMO Safari plugin
    // returns js object represent the plugin
    function _createPlugin()
    {
        var pluginId = '_DymoLabelFrameworkJslPlugin';
                
        if (!document.getElementById(pluginId))
        {
            // try to create Safari Plugin as <embed> control
            var plugin = document.createElement("embed");
            plugin.type = "application/x-dymolabel";
            plugin.id = pluginId;
            plugin.width = 1;
            plugin.height = 1;
            plugin.hidden = true;

            // it is important to add it to the DOM
            // otherwise _DymoLabelFrameworkJslSafariPlugin is unavailable and 
            // it is impossible to call plug-in methods
            document.body.appendChild(plugin);
        }
        
        //return _DymoLabelFrameworkJslSafariPlugin;
        return document.getElementById(pluginId);
    }

    // browser specific class to access core functions
    var _framework;
    function _createFramework()
    {
        if (!_framework)
        {
            var checkResult = checkEnvironment(); 
            if (checkResult.errorDetails != "")
                throw new Error(checkResult.errorDetails);


            // create core framework object based on browser
            if (typeof ActiveXObject != "undefined") //IE
            //if (false)
            {
                _framework = {};
                var frameworkIE = new ActiveXObject("DYMOLabelFrameworkIEPlugin.Plugin");
                if (typeof frameworkIE != "object")
                    throw new Error("createFramework(): unable to create DYMO.Label.Framework object. Check DYMO Label Framework is installed");

                // map functions
                _framework.getPrinters = function() { return frameworkIE.GetPrinters(); };
                _framework.openLabelFile = function(fileName) { return frameworkIE.OpenLabelFile(fileName); };
                _framework.printLabel = function(printerName, printParamsXml, labelXml, labelSetXml) { frameworkIE.PrintLabel(printerName, printParamsXml, labelXml, labelSetXml); };
                _framework.renderLabel = function(labelXml, renderParamsXml, printerName) { return frameworkIE.RenderLabel(labelXml, renderParamsXml, printerName); };
                _framework.loadImageAsPngBase64 = function(imageUri) { return frameworkIE.LoadImageAsPngBase64(imageUri); };
            }
            //else if (typeof DymoLabelFrameworkXpCom != "undefined") // Firefox
            //{
            //    _framework = new DymoLabelFrameworkXpCom();
            //}
            //else if (navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Opera") != -1) // Chrome
            else if (navigator.platform.indexOf("Win") != -1)
            {
                var plugin = _createPlugin();
                if (plugin)
                {
                    _framework = {};
                    // map functions
                    _framework.getPrinters = function() { return plugin.getPrinters(); };
                    _framework.openLabelFile = function(fileName) {return plugin.openLabelFile(fileName);};
                    _framework.printLabel = function(printerName, printParamsXml, labelXml, labelSetXml) { plugin.printLabel(printerName, printParamsXml, labelXml, labelSetXml); };
                    _framework.renderLabel = function(labelXml, renderParamsXml, printerName) { return plugin.renderLabel(labelXml, renderParamsXml, printerName); };
                    _framework.loadImageAsPngBase64 = function(imageUri) { return plugin.loadImageAsPngBase64(imageUri); };
                }
                else
                    throw new Error("DYMO Label Framework is not installed");
            }
            else // Safari Mac
            {
                var safariPlugin = _createSafariPlugin();
                if (safariPlugin)
                {
                    _framework = {};
                    // map functions
                    _framework.getPrinters = function() { return safariPlugin.getPrinters(); };
                    _framework.openLabelFile = function(fileName) 
                    {
                        var result = safariPlugin.openLabelFile(fileName); 
                        
                        // check for error
                        if (!result)
                            throw new Error("Unable to open label file '" + fileName + "'");
                        
                        return result;
                    };
                    _framework.printLabel = function(printerName, printParamsXml, labelXml, labelSetXml) { safariPlugin.printLabel(labelXml, printerName, printParamsXml, labelSetXml); };
                    _framework.renderLabel = function(labelXml, renderParamsXml, printerName) { return safariPlugin.renderLabel(labelXml, renderParamsXml, printerName); };
                    _framework.loadImageAsPngBase64 = function(imageUri) 
                    { 
                        var result = safariPlugin.loadImageAsPngBase64(imageUri); 
                        
                        if (!result)
                            throw new Error("Unable to load image from uri '" + imageUri + "'");
                        
                        return result;
                    };
                }
                else
                    throw new Error("DYMO Label Framework is not installed");
            }
        }

        return _framework;
    }

    // returns all printers supported by the DYMO Label Framework
    // printers are returned in array-like object that is an associative-array with printer name as a key as well
    // each printer object has following properties:
    // printerType - either "LabelWriterPrinter" or "TapePrinter"
    // name - printer's name (print queue name on Mac)
    // modelName - printer model/driver name
    // isConnected - is printer connected to computer or not. Note: currently properly returned only for local USB-connected printers on Windows
    // isLocal - is printer local USB-connected or shared network printer. Note: currently works on Windows only. 
    // isTwinTurbo - is printer "LabelWriter Twin Turbo" (has two rolls). Note: the property only defined if printerType is "LabelWriterPrinter"
    // isAutoCutSupported - is Auto-Cut feature supported by the printer. Note: the property only defined if printerType is "TapePrinter"
    function getPrinters()
    {
        //TODO: update to use functions from Xml namespace
        var getXmlText = function(elem) { return elem.firstChild.data; };
        var getChildText = function(elem, child) { return getXmlText(elem.getElementsByTagName(child)[0]); };

        var printersXml = _createFramework().getPrinters();

        var xmldoc = Xml.parse(printersXml);
        var result = new Array();

        //TODO: update to use XPath
        var printers = xmldoc.getElementsByTagName("Printers")[0];
        var labelWriterPrinters = printers.getElementsByTagName("LabelWriterPrinter");
        for (var i = 0; i < labelWriterPrinters.length; i++)
        {
            var labelWriterPrinter = {};
            labelWriterPrinter.printerType = "LabelWriterPrinter";
            labelWriterPrinter.name = getChildText(labelWriterPrinters[i], "Name");
            labelWriterPrinter.modelName = getChildText(labelWriterPrinters[i], "ModelName");
            labelWriterPrinter.isConnected = getChildText(labelWriterPrinters[i], "IsConnected") == "True";
            labelWriterPrinter.isLocal = getChildText(labelWriterPrinters[i], "IsLocal") == "True";
            labelWriterPrinter.isTwinTurbo = getChildText(labelWriterPrinters[i], "IsTwinTurbo") == "True";

            result[i] = labelWriterPrinter;
            result[labelWriterPrinter.name] = labelWriterPrinter;
        }

        var tapePrinters = printers.getElementsByTagName("TapePrinter");
        for (var i = 0; i < tapePrinters.length; i++)
        {
            var tapePrinter = {};
            tapePrinter.printerType = "TapePrinter";
            tapePrinter.name = getChildText(tapePrinters[i], "Name");
            tapePrinter.modelName = getChildText(tapePrinters[i], "ModelName");
            tapePrinter.isConnected = getChildText(tapePrinters[i], "IsConnected") == "True";
            tapePrinter.isLocal = getChildText(tapePrinters[i], "IsLocal") == "True";
            tapePrinter.isAutoCutSupported = getChildText(tapePrinters[i], "IsAutoCutSupported") == "True";

            result[i + labelWriterPrinters.length] = tapePrinter;
            result[tapePrinter.name] = tapePrinter;
        }

        return result;
    }

    // loads label content from a file or URL
    // There are some considerations should be taken into account before using this function.
    // Use it only then there are no other way to load label data, that in most cases should be done using openLabelXml()
    // - full file name/url should be specified. The function will not honor relative pathes based on document.location.href
    // - the fileName can be http:// or file:// urls. On Windows it can be a regular file name, like 'c:\users\desktop\address.label' 
    // - the content of the label will be loaded synchronously. So if the remote server is down there will be a timeout.
    // - any local file can be accessed/tried to be accessed. The function is not limited by any browser restrictions. 
    //   Though only a valid label file (according to label.xsd schema) can be loaded this still can be potential security concern.
    // - the URL is not limited to same-site-origin browser policy - any url can be opened
    // - the proxy settings are system default settings, not nessesary browser settings. TODO: fix it by providing proxy settings params into the library (same as DLS7) or read browser proxy settings (if possible) 
    // returns Label object provides label manipulation methods
    function openLabelFile(fileName)
    {
        return new Label(_createFramework().openLabelFile(fileName));
    }

    // loads label content from xml stream/string
    // labelXml - label definition as xml string
    // Note: it is a preferable way to load/open label files. Use XMLHttpRequest() or other standard browser methods to get xml string.
    // returns Label object
    function openLabelXml(labelXml)
    {
        return new Label(labelXml);
    }

    // Prints a label
    // printerName - the printer to print on. A list of printers can be obtained by getPrinters()
    // printParamsXml - printing parameters, like number of copies, print quality, etc. See PrintParams.xsd
    // labelXml - label to print
    // labelSetXml - LabelSet to print. LabelSet is used to print multiple labels with same layout but different data, e.g. multiple addresses.
    //               Use LabelSetBuilder to create a LabelSet or construct xml manualy according to LabelSet.xsd
    function printLabel(printerName, printParamsXml, labelXml, labelSetXml)
    {
        printParamsXml = printParamsXml || "";
        labelSetXml = labelSetXml || "";
        if (typeof(labelSetXml) != "string")
            labelSetXml = labelSetXml.toString();
            
        if (typeof(labelXml) == "undefined")
                throw new Error("printLabel(): labelXml parameter should be specified");

        if (typeof(labelXml) != "string")
            labelXml = labelXml.toString();

        _createFramework().printLabel(printerName, printParamsXml, labelXml, labelSetXml);
    };

    // Creates a label bitmap image can be used for label previewing
    // Params:
    // - labelXml - label to preview
    // - renderParamsXml - rendering parameters, like shadow depth, label color, etc. See LabelRenderParams.xsd
    // - printerName - printer name the preview is generated for. Thhe preview/output cna be different on different printers,
    //                 especially on tape printers with different print head size.
    //                 An empty string can be passed if it does not matter or important on whitch printer the label will be printed.
    //                 In this case a default printer metrics will be used that is LW400 for LabelWriter printers and LW400 DUO Tape for tape printers
    function renderLabel(labelXml, renderParamsXml, printerName)
    {
        if (typeof(labelXml) == "undefined")
                throw new Error("renderLabel(): labelXml parameter should be specified");

        if (typeof(labelXml) != "string")
            labelXml = labelXml.toString();

        renderParamsXml = renderParamsXml || "";
        printerName = printerName || "";

        return _createFramework().renderLabel(labelXml, renderParamsXml, printerName);
    };

    // Loads an image from url/file and returns it as base64-encoded png stream.
    // Note: the same comments as for openLabelFile() is applied to this function as well
    function loadImageAsPngBase64(imageUri)
    {
        return _createFramework().loadImageAsPngBase64(imageUri);
    };

    // Creates an xml stream suatable to pass to printLabel() function as printParamsXml parameter
    // Created printing parameters are for printing on LabelWriter printers
    // Parameters:
    // - params - an JavaScript object with following properties (not all properties have to be defined, if a property is not defined a default value will be used)
    //      params.copies - number of copies to print
    //      params.jobTitle - print job title/description
    //      params.flowDirection - prints label content as left-to-right or right-to-left use FlowDirection enum to specify values
    //      params.printQuality - printing quality, one of 'Text', 'BarcodeAndGraphics', or 'Auto'
    //      params.twinTurboRoll - the roll to print on if the printer is TwinTurbo. One of 'Left", 'Right', or 'Auto'
    function createLabelWriterPrintParamsXml(params)
    {
        if (!params)
            return "";

        var doc = Xml.parse("<LabelWriterPrintParams/>");
        var root = doc.documentElement;

        if (params.copies)
            Xml.appendElement(root, "Copies", params.copies);

        if (params.jobTitle)
            Xml.appendElement(root, "JobTitle", params.jobTitle);

        if (params.flowDirection)
            Xml.appendElement(root, "FlowDirection", params.flowDirection);

        if (params.printQuality)
            Xml.appendElement(root, "PrintQuality", params.printQuality);

        if (params.twinTurboRoll)
            Xml.appendElement(root, "TwinTurboRoll", params.twinTurboRoll);

        //var result = Xml.serialize(doc);
        //alert(result);
        //return result;

        return Xml.serialize(doc);
    }

    // Creates an xml stream suatable to pass to printLabel() function as printParamsXml parameter
    // Created printing parameters are for printing on Tape printers
    // Parameters:
    // - params - an JavaScript object with following properties (not all properties have to be defined, if a property is not defined a default value will be used)
    //      params.copies - number of copies to print
    //      params.jobTitle - print job title/description
    //      params.flowDirection - prints label content as left-to-right or right-to-left use FlowDirection enum to specify values
    //      params.alignment - lable alignment. One of 'Left', 'Center', or 'Right'
    //      params.cutMode - cut mode if auto-cut is supported by the printer. One of 'AutoCut" or 'ChainMarks'
    function createTapePrintParamsXml(params)
    {
        if (!params)
            return "";

        var doc = Xml.parse("<TapePrintParams/>");
        var root = doc.documentElement;

        if (params.copies)
            Xml.appendElement(root, "Copies", params.copies);

        if (params.jobTitle)
            Xml.appendElement(root, "JobTitle", params.jobTitle);

        if (params.flowDirection)
            Xml.appendElement(root, "FlowDirection", params.flowDirection);

        if (params.alignment)
            Xml.appendElement(root, "Alignment", params.alignment);

        if (params.cutMode)
            Xml.appendElement(root, "CutMode", params.cutMode);

        return Xml.serialize(doc);
    }

    // Creates an xml stream suatable to pass to renderLabel() function as renderParamsXml parameter
    // Parameters:
    // - params - an JavaScript object with following properties (not all properties have to be defined, if a property is not defined a default value will be used)
    //      params.labelColor - color of the label. labelColor is an object with properties 'a' or 'alpha' to specify color's alpha channel, r/red, g/green, b/blue for red, green, blue channels
    //      params.shadowColor - color of label shadow
    //      params.shadowDepth -  shadow width in TWIPS. if '0' is specified no shadow is rendered
    //      params.flowDirection - prints label content as left-to-right or right-to-left use FlowDirection enum to specify values
    //      params.pngUseDisplayResolution - if true, the png will be generated using display resolution, othewise using printer resolution. 
    //                                       If a display resolution is used the resulting png will be smaller. 
    //                                       Use printer resolution if resulting image is going to be zoomed, so the zoomed preview will have better quality.   
     
    function createLabelRenderParamsXml(params)
    {
        if (!params)
            return "";

        var doc = Xml.parse("<LabelRenderParams/>");
        var root = doc.documentElement;

        var addColor = function(tagName, color)
        {
            Xml.appendElement(root, tagName, null,
                {
                    Alpha: color.a || color.alpha || 255, // opaque
                    Red: color.r || color.red || 0,
                    Green: color.g || color.green || 0,
                    Blue: color.b || color.blue || 0
                });
        };

        if (params.labelColor)
            addColor("LabelColor", params.labelColor);

        if (params.shadowColor)
            addColor("ShadowColor", params.shadowColor);

        if (typeof params.shadowDepth != "undefined")
            Xml.appendElement(root, "ShadowDepth", params.shadowDepth);

        if (params.flowDirection)
            Xml.appendElement(root, "FlowDirection", params.flowDirection);

        if (typeof params.pngUseDisplayResolution != "undefined")
            Xml.appendElement(root, "PngUseDisplayResolution", params.pngUseDisplayResolution ? "True" : "False");

        return Xml.serialize(doc);
    }

    /////////////////////////////////////////////////////////
    // Enums
    /////////////////////////////////////////////////////////

    // Specifies how objects and object text are laid down on the label. For Middle East labels/content specify RightToLeft, otherwise "LeftToRight" (default)
    var FlowDirection =
    {
        LeftToRight: "LeftToRight",
        RightToLeft: "RightToLeft"
    };

    // Specifies printing quality when printed on LabelWriter printers
    // 'Text' - text print quality (fast)
    // 'BarcodeAndGraphics' - barcode and images print quality (slow)
    // 'Auto' - automatically determines the print quality based on objects on the label
    var LabelWriterPrintQuality =
    {
        Auto: "Auto",
        Text: "Text",
        BarcodeAndGraphics: "BarcodeAndGraphics"
    };

    // Specifies on whitch roll to print when printing on Twin Turbo printers
    // Left - print on left roll only
    // Right - print on right roll only
    // Auto - continue printing on a different roll when current roll is out of paper. Note: it does not guarantee on whitch roll it will start printing. it can be both left or right.
    var TwinTurboRoll =
    {
        Auto: "Auto",
        Left: "Left",
        Right: "Right"
    };

    // Specifies tape's leader and trailer on a label when printing on Tape printer
    // Center - 10mm leader and trailer
    // Left - 6mm leader, 10mm trailer
    // Right - 10mm leader, 6mm trailer
    var TapeAlignment =
    {
        Center: "Center",
        Left: "Left",
        Right: "Right"
    };

    // Specifies how tape is cut between label when printing multiple labels on Tape printers.
    // Note: it affects multiple pages print jobs only, if one page job is printed the tape is always cut.
    // AutoCut - cut tape between pages
    // ChainMarks - draw a mark between pages
    var TapeCutMode =
    {
        AutoCut: "AutoCut",
        ChainMarks: "ChainMarks"
    };

    // Specifies when to draw Intellegent-Mail barcode for address object
    // AboveAddress - print barcode above the address
    // BelowAddress - print barcode below the address
    // Suppress - don't print barcode as all
    var AddressBarcodePosition =
    {
        AboveAddress: "AboveAddress",
        BelowAddress: "BelowAddress",
        Suppress: "Suppress"
    };

    /////////////////////////////////////////////////////////
    // Classes
    /////////////////////////////////////////////////////////

    // Label class
    // Provides methods to manipulate label content, e.g. enumerate objects on the label, get/set objects text, etc
    function Label(labelXml)
    {
        /////////////////////////////////////////////////////
        // implementation details
        ///////////////////////////////////////////////////// 

        var doc = Xml.parse(labelXml);
        
        //function _getLabelType()
        //{
        //    return doc.documentElement.tagName;
        //}

        // Returns current label xml as a string
        // the returned xmlcan be passed to functions accepts label xml as a parameter
        // or can be used to direct content manipulations not currently supported by the Framework 
        function getLabelXml()
        {
            return Xml.serialize(doc);
        }

        // Creates the label bitmap image can be used for label previewing. Similar to dymo.label.framework.renderLabel()
        // Parameters:
        //      labelXml - label to preview
        //      renderParamsXml - rendering parameters, like shadow depth, label color, etc. See LabelRenderParams.xsd
        //      printerName - printer name the preview is generated for. Thhe preview/output cna be different on different printers,
        //                    especially on tape printers with different print head size.
        //                    An empty string can be passed if it does not matter or important on whitch printer the label will be printed.
        //                    In this case a default printer metrics will be used that is LW400 for LabelWriter printers and LW400 DUO Tape for tape printers 
        // Returns base64-encoded string of rendered png label image 
        function render(renderParamsXml, printerName)
        {
            return renderLabel(getLabelXml(), renderParamsXml, printerName);
        }

        // Prints the label. Similar to dymo.label.framework.printLabel()
        // Parameters:
        //      printerName - the printer to print on. A list of printers can be obtained by dymo.label.framework.getPrinters()
        //      printParamsXml - printing parameters, like number of copies, print quality, etc. See PrintParams.xsd
        //      labelSetXml - LabelSet to print. LabelSet is used to print multiple labels with same layout but different data, e.g. multiple addresses.
        //                    Use LabelSetBuilder to create a LabelSet or construct xml manualy according to LabelSet.xsd
        function print(printerName, printParamsXml, labelSetXml)
        {
            printLabel(printerName, printParamsXml, getLabelXml(), labelSetXml);
        }

        // returns all object elements on the label
        function _getObjectElements()
        {
            var objectTypes = ["AddressObject",
                "TextObject",
                "BarcodeObject",
                "ShapeObject",
                "CounterObject",
                "ImageObject",
                "CircularTextObject",
                "DateTimeObject"];
            return Xml.getNodes(doc, "//" + objectTypes.join("|//"));

            //return Xml.getNodes(doc, "//AddressObject | //TextObject  | //BarcodeObject | //ShapeObject  | //DateTimeObject  | //CounterObject  | //ImageObject  | //CircularTextObject", null);
        };

        // returns an array of object names on the label
        function getObjectNames()
        {
            var objects = _getObjectElements();
            var result = new Array();
            for (var i = 0; i < objects.length; i++)
                result.push(Xml.getElementText(Xml.getNode(objects[i], "Name")));

            return result;
        };

        // address object methods

        // returns all AddressObject elements
        function _getAddressObjectElements()
        {
            return Xml.getNodes(doc, "//AddressObject");
        };

        // returns the number of address objects on the label
        function getAddressObjectCount()
        {
            return _getAddressObjectElements().length;
        };

        // returns address object element by index 
        function _getAddressObjectElementByIndex(addressIndex)
        {
            return _getAddressObjectElements()[addressIndex];
            //TODO: add manual index checking ???

            //            var addressElements = _getAddressObjectElements();
            //            if (addressIndex < 0 || addressIndex >= addressElements.length)
            //                throw new Error("getAddressBarcodePosition(): index out of bounds");

            //            var elem = addressElements[addressIndex];
        }

        // Returns IntellegentMail barcode position for an Address object
        // Parameters:
        //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
        // Returns Element object of the corresponed address object 
        function getAddressBarcodePosition(addressIndex)
        {
            return Xml.getElementText(Xml.getNode(_getAddressObjectElementByIndex(addressIndex), "BarcodePosition"));
        };

        // check the value of passed barcodePosition string to be a valid position value
        // TODO: create universal _verifyEnum() (using for/in); check all values for all defined enums
        // TODO: check other vlaues as well ???
        function _verifyAddressBarcodePosition(barcodePosition)
        {
            if (barcodePosition == AddressBarcodePosition.AboveAddress
                || barcodePosition == AddressBarcodePosition.BelowAddress
                || barcodePosition == AddressBarcodePosition.Suppress)
                return;

            throw new Error("verifyAddressBarcodePosition(): barcode position '" + barcodePosition + "' is invalid value");
        };

        // Set IntelegentMail barcode position for an Address object
        // Parameters:
        //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
        //      bacodePosition - one of barcode position defined in dymo.label.framework.AddressBarcodePosition 
        // Returns Element object of the corresponed address object 
        function setAddressBarcodePosition(addressIndex, barcodePosition)
        {
            _verifyAddressBarcodePosition(barcodePosition);

            Xml.setElementText(Xml.getNode(_getAddressObjectElementByIndex(addressIndex), "BarcodePosition"), barcodePosition);
        };

        // Returns text content of an Address object
        // Parameters:
        //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
        // Returns string contained plain text from the Address object 
        function getAddressText(addressIndex)
        {
            return _getAddressObjectText(_getAddressObjectElementByIndex(addressIndex));
        }

        // Set text content of an Address object
        // Parameters:
        //      addressIndex - zero-based index of the address object in 'virtual' array of all address objects on the label
        //      text - plain text string contain the content. Note: current text formatting is remained on line-by-line basis  
        function setAddressText(addressIndex, text)
        {
            return _setAddressObjectText(_getAddressObjectElementByIndex(addressIndex), text);
        }

        // returns xml Element of corresponded label object with name objectName
        function _getObjectByNameElement(objectName)
        {
            var objects = _getObjectElements();

            // find object with name
            for (var i = 0; i < objects.length; i++)
            {
                var elem = objects[i];
                var name = Xml.getElementText(Xml.getNode(elem, "Name"));
                if (name == objectName)
                    return elem;
            }

            throw new Error("getObjectByNameElement(): no object with name '" + objectName + "' was found");
        };

        // extracts text content of an Address object represented by xml element objectElem
        // the same function used to get Text object content
        function _getAddressObjectText(objectElem)
        {
            var textElems = Xml.getNodes(objectElem, "StyledText/Element/String//text()");
            var result = "";
            for (var i = 0; i < textElems.length; i++)
                result = result + textElems[i].data;
            return result;
        }

        // Returns 'text' content of an object
        // The content depends on object type:
        //  - for Address and Text objects it is object's text without formatting
        //  - for Barcode object it is barcode string
        //  - for Image it is base64-encoded string on image's png stream (only if image data is embedded with the label, not linked to url/file)
        //  - for CircularText it is object's text
        //  - for other objects an empty string is returned
        function getObjectText(objectName)
        {
            var objectElem = _getObjectByNameElement(objectName);
            var objectType = objectElem.tagName;

            switch (objectType)
            {
                case "AddressObject":
                case "TextObject":
                    return _getAddressObjectText(objectElem);

                case "BarcodeObject":
                    return Xml.getElementText(Xml.getNode(objectElem, "Text", null));

                case "ImageObject":
                    // if image is embedded return it (base64 png stream)
                    var imageElem = Xml.getNode(objectElem, "Image", null);
                    if (imageElem)
                        return Xml.getElementText(imageElem);
                    else
                        return "";

                case "CircularTextObject":
                    return Xml.getElementText(Xml.getNode(objectElem, "Text", null));

                case "DateTimeObject":
                case "CounterObject":
                    //TODO: probably we want to reimplement objects' behaviour and return
                    // full text as rendered on a label
                    break;
            }

            return ""; // default
        };


        // returns line-by-line attibutes (as xml Element) of the StyledText
        function _getStyledTextLineAttributes(styledTextElem)
        {
            var result = new Array();
            var elems = Xml.getNodes(styledTextElem, "Element");
            for (var i = 0; i < elems.length; i++)
            {
                var elem = elems[i];
                var lines = Xml.getElementText(Xml.getNode(elem, "String")).split("\n");

                var linesCount = lines.length;
                if (i > 0)
                    linesCount--; // don't count the 'first' line of second, and further element because it is a continuation of the line of the prevous element

                var attributesElem = Xml.getNode(elem, "Attributes");
                for (var l = 0; l < linesCount; l++)
                    result.push(attributesElem);
            }

            return result;
        }

        // sets content for an Address object
        // Parameters:
        //      objectElem - Element corresponded to the address object
        //      text - plain text string of the address data
        // Note: text formating is applied on line-by-line basis using object's <LineFonts> list
        function _setAddressObjectText(objectElem, text)
        {
            //get <StyledText>
            var styledTextElem = Xml.getNode(objectElem, "StyledText");
            var attributes = _getStyledTextLineAttributes(styledTextElem);

            var lineFonts = Xml.getNodes(objectElem, "LineFonts/Font");
            var defaultFont;
            if (lineFonts.length == 0)
                defaultFont = Xml.parse('<Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />').documentElement;
            var defaultColor = Xml.parse('<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />').documentElement;

            // clear all text
            Xml.removeAllChildren(styledTextElem);

            var lines = text.split('\n');
            for (var i = 0; i < lines.length; i++)
            {
                var line = lines[i].replace('\r', '');
                if (i < lines.length - 1)
                    line = line + '\n';

                // use font from lineFonts or the last font or the default font if there are no line fonts
                var font = defaultFont;
                if (i < lineFonts.length)
                    font = lineFonts[i];
                else if (lineFonts.length > 0)
                    font = lineFonts[lineFonts.length - 1];

                // font color
                var fontColor = defaultColor;
                //alert(Xml.serialize(fontColor));
                if (i < attributes.length)
                    fontColor = Xml.getNode(attributes[i], "ForeColor");
                //alert(Xml.serialize(fontColor));
                // create styledText element for the line
                var elemElem = styledTextElem.ownerDocument.createElement("Element");
                var stringElem = styledTextElem.ownerDocument.createElement("String");
                Xml.setElementText(stringElem, line);
                var attributesElem = styledTextElem.ownerDocument.createElement("Attributes");
                attributesElem.appendChild(font.cloneNode(true));
                attributesElem.appendChild(fontColor.cloneNode(true));
                elemElem.appendChild(stringElem);
                elemElem.appendChild(attributesElem);
                styledTextElem.appendChild(elemElem);

                //alert(Xml.serialize(styledTextElem));
            }
        }

        // sets text content for an object. Depends on object's type the content and/or text formatitng are set differently:
        //  - for Address the formatting is applied on line-by-line basis using <LineFonts> list
        //  - for text the formatting of current first character is used for the whole text 
        //  - for Barcode object it is barcode string
        //  - for Image it is base64-encoded string of image's png stream
        //  - for CircularText it is object's text
        //  - for DateTime and Counter object it is object's PreText
        //  - for other objects an empty string is returned
        // Parameters:
        //      objectName - object name
        //      text - plain text string for new object content
        function setObjectText(objectName, text)
        {
            var objectElem = _getObjectByNameElement(objectName);
            var objectType = objectElem.tagName;

            switch (objectType)
            {
                case "AddressObject":
                    _setAddressObjectText(objectElem, text);
                    break;

                case "TextObject":
                    //get <StyledText>
                    var styledTextElem = Xml.getNode(objectElem, "StyledText");
                    var firstElem = Xml.getNode(styledTextElem, "Element");
                    if (firstElem)
                    {
                        // remove all other children
                        Xml.removeAllChildren(styledTextElem);

                        // replace string with supplied text
                        Xml.setElementText(Xml.getNode(firstElem, "String"), text);

                        //readd first elem with updated string
                        styledTextElem.appendChild(firstElem);
                    }
                    else
                    {
                        // the StyledText is empty - simple add <Element> with default font info
                        var defaultElem = '<Element><String>' + text + '</String>\
                            <Attributes>\
                                <Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                            </Attributes></Element>';

                        var d = Xml.parse(defaultElem);
                        styledTextElem.appendChild(d.documentElement.cloneNode(true));
                    }
                    break;

                case "BarcodeObject":
                    Xml.setElementText(Xml.getNode(objectElem, "Text"), text);
                    break;

                case "ImageObject":
                    // if image is embedded return it (base64 png stream)
                    var imageElem = Xml.getNode(objectElem, "Image", null);
                    if (imageElem)
                        Xml.setElementText(imageElem, text);
                    else
                    {
                        // if there is no <Image> tag then there should be <ImageLocation>
                        // so replace <ImageLocation> with <Image> 
                        var imageLocationElem = Xml.getNode(objectElem, "ImageLocation", null);
                        if (!imageLocationElem)
                            throw new Error("setObjectText(): <ImageLocation> is expected but not found: " + Xml.serialize(imageElem));

                        // create <Image> elem
                        imageElem = imageLocationElem.ownerDocument.createElement("Image");
                        Xml.setElementText(imageElem, text);
                        objectElem.replaceChild(imageElem, imageLocationElem);
                    }
                    break;

                case "CircularTextObject":
                    Xml.setElementText(Xml.getNode(objectElem, "Text", null), text);
                    break;

                case "DateTimeObject":
                    Xml.setElementText(Xml.getNode(objectElem, "PreText", null), text);
                    break;

                case "CounterObject":
                    Xml.setElementText(Xml.getNode(objectElem, "PreText", null), text);
                    break;
            }

            return ""; // default
        };

        /////////////////////////////////////////////////////
        // public methods
        /////////////////////////////////////////////////////
        this.getLabelXml = getLabelXml;
        this.print = print;
        this.render = render;
        this.getObjectNames = getObjectNames;
        this.getAddressObjectCount = getAddressObjectCount;
        //this.getAddressObjectNames = getAddressObjectNames;
        this.getAddressBarcodePosition = getAddressBarcodePosition;
        this.setAddressBarcodePosition = setAddressBarcodePosition;
        this.getAddressText = getAddressText;
        this.setAddressText = setAddressText;
        this.getObjectText = getObjectText;
        this.setObjectText = setObjectText;

        this.toString = getLabelXml;
    };


    // LabelSetBuilder class
    // LabelSetBuilder is used to create a label-set to print multiple label in one print job. 
    // LabelSet is a collection of records. Each record contains pairs of object name and object text data/content.
    // The data of each record are applied to all corresponend objects and for each record one label is printed.  
    function LabelSetBuilder()
    {
        var _records = new Array();

        // Returns label set records 
        this.getRecords = function() { return _records; };
    };

    // Adds a new record to the label-set
    // Returns created record object 
    LabelSetBuilder.prototype.addRecord = function()
    {
        var record = new LabelSetRecord();
        this.getRecords().push(record);

        return record;
    };


    var TextMarkupTag = "<TextMarkup>";
    var TextMarkupClosedTag = "</TextMarkup>";
    
    // Convert record objects into xml format defined in LabelSet.xsd
    // Returned xml can be passed to dymo.label.framefork.printLabel() as labelSetXml parameter.
    // Parameters:
    //      records - records to convert to xml. records should be array-like object of associative-arrays with object names as keys and object text as values.
    // Return string contains xml data
    // Note: this function can be used independed of other LabelSetBuilder methods if records data is generated by other functions  
    LabelSetBuilder.toXml = function(records)
    {
        // create xml representation of LabelSet
        // records is a Array-like object of associative arrays of object name/object value pairs

        var doc = Xml.parse("<LabelSet/>");
        var root = doc.documentElement;

        for (var i = 0; i < records.length; i++)
        {
            var record = records[i];

            var recordElem = doc.createElement("LabelRecord");

            for (var objectName in record)
            {
                var objectValue = record[objectName];
                if (typeof objectValue == "function")
                    continue;

                var objectElem = doc.createElement("ObjectData");
                objectElem.setAttribute("Name", objectName);


                if (objectValue.indexOf(TextMarkupTag) == 0)
                {
                    // parse the markup into xml and insert it as is
                    var markupDoc = Xml.parse(objectValue);
                    objectElem.appendChild(markupDoc.documentElement.cloneNode(true));
                }
                else
                {
                    var textNode = doc.createTextNode(objectValue);
                    objectElem.appendChild(textNode);
                }
                recordElem.appendChild(objectElem);
            }

            root.appendChild(recordElem);
        }

        return Xml.serialize(doc);
    };

    // Converts hte builder to an xml string
    LabelSetBuilder.prototype.toString = function()
    {
        return LabelSetBuilder.toXml(this.getRecords());
    };

    // LabelSetRecord class
    // Holds data of one label-set records and provides methods to add data to the record
    function LabelSetRecord()
    {
    };

    // Adds data to the record specified as text markup
    // Parameters:
    //      objectName - object name which the markup is set for
    //      textMarkup - markup string 
    LabelSetRecord.prototype.setTextMarkup = function(objectName, textMarkup)
    {
        textMarkup = textMarkup.toString();

        if (textMarkup.indexOf(TextMarkupTag) != 0)
            textMarkup = TextMarkupTag + textMarkup + TextMarkupClosedTag;

        this[objectName] = textMarkup;
    };

    // Adds data to the record specified as plain text
    // Parameters:
    //      objectName - object name which the markup is set for
    //      text - text string 
    LabelSetRecord.prototype.setText = function(objectName, text)
    {
        this[objectName] = text;
    };

    // Adds image data to the record.
    // Parameters:
    //      objectName - object name which the markup is set for
    //      base64Image - string contains base64-encoded png image stream
    LabelSetRecord.prototype.setBase64Image = function(objectName, base64Image)
    {
        this[objectName] = base64Image;
    };

    /////////////////////////////////////////////////////////
    // import functions into the namespace
    /////////////////////////////////////////////////////////
    dymo.label.framework.checkEnvironment = checkEnvironment;
    dymo.label.framework.getPrinters = getPrinters;
    dymo.label.framework.openLabelFile = openLabelFile;
    dymo.label.framework.openLabelXml = openLabelXml;
    dymo.label.framework.printLabel = printLabel;
    dymo.label.framework.renderLabel = renderLabel;
    dymo.label.framework.loadImageAsPngBase64 = loadImageAsPngBase64;

    // factory functions
    dymo.label.framework.createLabelWriterPrintParamsXml = createLabelWriterPrintParamsXml;
    dymo.label.framework.createTapePrintParamsXml = createTapePrintParamsXml;
    dymo.label.framework.createLabelRenderParamsXml = createLabelRenderParamsXml;

    // enums
    dymo.label.framework.FlowDirection = FlowDirection;
    dymo.label.framework.LabelWriterPrintQuality = LabelWriterPrintQuality;
    dymo.label.framework.TwinTurboRoll = TwinTurboRoll;
    dymo.label.framework.TapeAlignment = TapeAlignment;
    dymo.label.framework.TapeCutMode = TapeCutMode;
    dymo.label.framework.AddressBarcodePosition = AddressBarcodePosition;

    //classes
    dymo.label.framework.LabelSetBuilder = LabelSetBuilder;
})();

