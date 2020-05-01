<%@ include file="init.jsp" %>
<% 
	String walkthroughSource = (String) renderRequest.getAttribute("data");
	if(walkthroughSource == null) { 
%>
	<h1>How to use this Demo Walkthrough</h1>
	<ul><li>Create a custom text field for pages, named "walkthrough-info".</li>
	<li>The existence of such a custom field (no data entered yet) will make 
	<i>this</i> message disappear. </li>
	<li>Go to page settings and enter a URL in this custom field. The URL should
	point to JSON instructions for a Walkthrough</li>
	<li>A <a href="https://www.olafkock.de/liferay/walkthrough/dummy.json">
	generic sample for a widget page with administrative UI is here</a></li>
	<li>Then embed this portlet on any page you'd like a walkthrough to be contained.</li>
	<li>Configure the walkthrough JSON URL for each page where you'd like a walkthrough</li>
	</ul>

<%      return;
    } else if(walkthroughSource.equals("none") || walkthroughSource.equals("")) {
    	return;
    } else {
%>

<div id="<portlet:namespace/>PlayerContainer">
</div>
<audio id="<portlet:namespace/>thePlayer" controls>
</audio>

<script>
	$.getJSON("<%=walkthroughSource%>", "", function(data){
		console.log(data);
		
		var thePlayer = $("#<portlet:namespace/>thePlayer");
		initializeWalkthroughPlayer(thePlayer, data);
	});
</script>
<%  }  %>