<%-- Constants --%>
<c:set var="damWorkspace" value="dam" />
<c:set var="websiteWorkspace" value="website" />
<c:set var="placeholder" value="${cmsfn:isEditMode() ? '&#x00b6;' : ''}" />
<c:set var="asset" value="mgnl:asset" />
<c:set var="docrootPath" value="${pageContext.request.contextPath}/docroot" />
<c:set var="currentPage" value="${cmsfn:page(content)}" />