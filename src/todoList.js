export const TodoList = (props) => {

	console.log(props.todolists);
	
	const list_items = props.todolists.map((i)=>{
		return <li key={i[0]}><input type="checkbox" id={i[0]} onClick={props.updatestatus}/>{i[1]}</li>
			
	});

	return (
		<ul>
			{list_items}
		</ul>
	)
}

