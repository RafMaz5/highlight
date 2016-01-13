function constructMessage(title, content, severity) {
	$message = $('#sticky');
	$message.find('.divider').removeClass('info warning error');
	$message.find('#stickyTitle').html(title);
	if (content === undefined) {
		$message.find('#stickyMessage').html(title);
	} else {
		$message.find('#stickyMessage').html(content);
	}
	if (severity === undefined) {
		$message.find('img').attr('src', '/highlight/img/info.png');
	} else {
		$message.find('img').attr('src', '/highlight/img/'+ severity +'.png');
		$message.find('.divider').addClass(severity);
	}
	$message.show(1000, 'swing');
	setTimeout(function(){
		$message.hide();
	},3000);
}