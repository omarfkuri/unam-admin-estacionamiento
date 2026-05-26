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
 * @param { HTMLFormElement } form
 * @param { string } buttonTitle
 * @param { (inp: { [key in T]: string | null }) => boolean } onSubmit
 * @returns { void }
 * */
export function formMaker(fields, form, onSubmit)
{
  const contenedor = document.querySelector(".fields");
	
	form.onsubmit = e => 
	{
		e.preventDefault();

		const results = Object.fromEntries(
			(new FormData(form)).entries()
		);

		if (onSubmit(results))
		{
			form.reset();
		}
	};

	for (const field of fields)
	{
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

    input.classList.add("input-box");

    contenedor.appendChild(label);
    contenedor.appendChild(input);
	}
}