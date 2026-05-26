/**
 * Esta función espera que el `form` pasado contenga
 * un hijo con la clase `.fields`, donde se colocarán
 * los campos, y un botón que ejecutará la función 
 * `onSubmit`.
 * 
 * @template { string } T
 * @param { {
 * 		name: T
 * 		label: string
 * 		placeholder: string
 * 		type: HTMLInputElement["type"]
 * 		required?: boolean
 * 		pattern?: RegExp
 * }[] } fields
 * @param { string } formID
 * @param { string } buttonTitle
 * @param { (inp: { [key in T]: string | null }) => boolean | Promise<boolean> } onSubmit
 * @returns { void }
 * */
export function formMaker(fields, formID, onSubmit)
{
	const form = document.getElementById(formID);
  const contenedor = form.querySelector(".fields");
	
	form.onsubmit = async e => 
	{
		e.preventDefault();

		const results = Object.fromEntries(
			(new FormData(form)).entries()
		);

		if (await onSubmit(results))
		{
			form.reset();
		}
	};

	for (const field of fields)
	{
    const inputBox = document.createElement('div');
    div.classList.add("input-box");

    const label = document.createElement('label');
    label.textContent = field.label;

    const input = document.createElement('input');
    input.type  = field.type;
    input.name  = field.name;
    input.placeholder = field.placeholder;

    if (field.pattern != null)
    	input.pattern = field.pattern;

    if (field.required != null)
    	input.required = field.required;

    inputBox.append(label);
    inputBox.append(input);

    contenedor.append(inputBox);
	}
}