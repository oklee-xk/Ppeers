<%@include file="/templates/includes/includes.jsp" %>
<section data-role="page" class="workspace" data-name="${model.definition.name}">
    <div role="main" class="ui-grid-a">
        <div class="ui-block-a" id="users-list">
            <jsp:include page="usersList.jsp" />
        </div>
        <div class="ui-block-b" id="chat-area">
            <jsp:include page="chatArea.jsp" />
        </div>
    </div>
</section>
