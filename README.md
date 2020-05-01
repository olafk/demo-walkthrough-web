# Demo Walkthrough

an animated and narrated demo through Liferay DXP 7.2's UI.

This plugin provides an audio narration for an individual page, combined with
remote-controlled (e.g. scripted) operation on the page, and highlighting areas
of interest.

It's thought to be a suggestion for documenting unattended demo systems for customers
who have no experience in using the UI, and would be overwhealmed when just looking at
the options.

## Build Instructions

* clone the directory into a Liferay Workspace's `modules` folder
* This plugin has been tested with `liferay.workspace.target.platform.version = 7.2.10.1`
* build and deploy it
* You'll find the _DemoWalkthrough_ portlet in the Samples section: Add it to a page and follow the instructions you see there, namely:
* Create a custom text field for pages, named "walkthrough-info".
* The existence of such a custom field (no data entered yet) will make the documentation message disappear.
* Go to page settings and enter a URL in this custom field. The URL should point to JSON instructions for a Walkthrough
* A [generic sample for a widget page with administrative UI is here](https://www.olafkock.de/liferay/walkthrough/dummy.json)
* Then embed the portlet on any page you'd like a walkthrough to be contained.
* Configure the walkthrough JSON URL for each page where you'd like a walkthrough

## Configuration

The plugin loads a JSON file with media and instructions for each page. 
Here's an example for such a file: 

	[
        {
	        "name": "Widgetpage Dummy documentation for Administrators",
	        "media": "https://www.olafkock.de/liferay/walkthrough/widgetpage-demo.mp3",
	        "command": [
                {
                    "command": "highlight",
                    "timeStart": 16,
                    "timeEnd": 20,
                    "payload": "#ControlMenu"
                },{
                    "command": "click",
                    "timeStart": 26,
                    "timeEnd": 27,
                    "payload": "#_com_liferay_product_navigation_control_menu_web_portlet_ProductNavigationControlMenuPortlet_addToggleId:not(.active)"
                },{
                    "command": "scroll",
                    "timeStart": 43,
                    "timeEnd": 44,
                    "payload": "[data-portlet-id=\"com_liferay_portal_search_web_category_facet_portlet_CategoryFacetPortlet\"]"
                }
            ]
        }
	]
	                                   
## Generic settings

### name

arbitrary - so far unused. Use to keep an overview for yourself. (see future plans)

### media

URL of an audio file that contains the spoken walkthrough for this configuration file

### timeStart / timeEnd

validity for the command - e.g. highlighting has a duration. For individual events like "click" and "scroll", you should specify 1 second duration.  

The time is given in seconds, and ideally should relate to the timecode in the addressed audio file.

### payload

content depends on the command, but typically denotes a CSS selector that will be resolved with JQuery.

### command

denotes one of the following commands:

## Valid Commands

### highlight

Highlights given target(s) of its CSS selector for the given time.

### click

Clicks the given target(s) of its CSS selector. 

Neat trick: If you want to trigger a specific operation (e.g. open the sidebar) look at the difference in classes for the open/close state. Often you can trigger a specific operation by adding an additional class - e.g. `#someId.active` vs `#someId:not(.active)`

### scroll

Scrolls the given target of its CSS selector into view.

### eval

Executes the given payload. A fine way to introduce XSS attacks.


## Future plans

* Introduce simple names for most common CSS selectors - e.g. the "Add Widgets" control in ControlMenu
* Make `eval` command superfluous
* Turn the plugin XSS safe.
* Simplify/beautify the UI, and embed the portlet in pages statically, so that it appears when configured, and doesn't appear when it's not.
* Provide default content/scripts for various occasions
* Combine with ControlPanel Documentation 
* Use more content than just the first element: JSON already is prepared to deliver multiple walkthroughs in a single file - but the UI ignores all but the first
* More robust Error handling
