<%@include file="/templates/includes/includes.jsp" %>
<c:forEach var="component" items="${components}">
    <cms:component content="${component}" />
</c:forEach>

