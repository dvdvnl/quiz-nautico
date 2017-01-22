$().ready(function(){
	$.get('assets/quiz.json', null, function(data){
		$.each(data, function(i, q){
			var $tr = $('<tr/>').attr('id', q.id);

			$tr.append(
				$('<td/>').text(q.id),
				$('<td/>').addClass('text').append($('<span/>').text(q.text)),
				$('<td/>').addClass('figure')
			);

			// answers
			var $ul = $('<ul>').addClass('answers');

			$.each(q.answer, function(i, a){
				var $li = $('<li>');

				$li.text(a.text);
				$li.data('correct', a.correct == 1);

				$li.addClass(a.correct == 1 ? 'correct' : 'false');

				$li.click(function(){
					var $tr = $(this).parents('tr');

					if(!$tr.data('answered')){

						if($(this).data('correct') == 1)
							$tr.addClass('success')
						else
							$tr.addClass('danger')

						$(this).addClass('clicked');

						$tr.data('answered', true);
						$tr.addClass('answered');
					}

				});

				$li.appendTo($ul);
			});

			$ul.appendTo($tr.children('.text'))

			// figure
			if(q.figure == 1){
				var $fig = $('<img/>').attr('src' ,'assets/figures/' + pad(q.id, 4) + '.png').appendTo($tr.children('.figure'));
			}

			$('#qBody').append($tr);

			// $tr.appendTo();
		});
	});
});

function pad(num, size) {
	var s = num + '';
	while (s.length < size) s = "0" + s;
	return s;
}
