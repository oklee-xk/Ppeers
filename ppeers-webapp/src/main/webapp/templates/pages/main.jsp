<%@include file="/templates/includes/includes.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <cms:init />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>${currentPage.title}</title>
    </head>
    <body>
        <cms:area name="header" />
        <cms:area name="body" />
        <cms:area name="aside" />
        <cms:area name="footer" />
    </body>
</html>

