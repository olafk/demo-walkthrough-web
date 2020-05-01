# Demo Walkthrough
## an animated and narrated demo through Liferay DXP 7.2's UI

How to build this plugin?

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

