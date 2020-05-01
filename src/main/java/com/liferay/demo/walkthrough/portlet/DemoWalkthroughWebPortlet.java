package com.liferay.demo.walkthrough.portlet;

import com.liferay.demo.walkthrough.constants.DemoWalkthroughWebPortletKeys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.WebKeys;

import java.io.IOException;
import java.io.Serializable;

import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;

/**
 * @author olaf
 */
@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.header-portlet-css=/css/main.css",
		"com.liferay.portlet.header-portlet-javascript=/js/main.js",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.display-name=DemoWalkthroughWeb",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.name=" + DemoWalkthroughWebPortletKeys.DEMOWALKTHROUGHPORTLET,
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class DemoWalkthroughWebPortlet extends MVCPortlet {
	
	@Override
	public void doView(RenderRequest renderRequest, RenderResponse renderResponse)
			throws IOException, PortletException {

		com.liferay.portal.kernel.theme.ThemeDisplay themeDisplay = (ThemeDisplay) renderRequest.getAttribute(WebKeys.THEME_DISPLAY);

		if(themeDisplay.getLayout().getExpandoBridge().hasAttribute("walkthrough-info")) {
			Serializable attribute = themeDisplay.getLayout().getExpandoBridge().getAttribute("walkthrough-info");
			if(attribute != null) {
				renderRequest.setAttribute("data", attribute.toString());
			} else {
				renderRequest.setAttribute("data", "none");
			}
		}
		
		
		super.doView(renderRequest, renderResponse);
	}
}