export default function FormElementPage({ currentItem, value, onChange }) {
  let content = null;

  switch (currentItem.type) {
    case 'text':
    case 'email':
    case 'password':
      content = (
        <input
          type={currentItem.type}
          placeholder={currentItem.placeholder}
          required={currentItem.required}
          id={currentItem.name}
          name={currentItem.name}
          value={value}
          onChange={onChange}
          className="border p-2 rounded w-full"
        />
      );
      break;

    case 'textarea':
      content = (
        <textarea
          placeholder={currentItem.placeholder}
          required={currentItem.required}
          id={currentItem.name}
          name={currentItem.name}
          value={value}
          onChange={onChange}
          rows={4}
          className="border p-2 rounded w-full"
        />
      );
      break;

    case 'select':
      content = (
        <select
          id={currentItem.name}
          name={currentItem.name}
          required={currentItem.required}
          value={value}
          onChange={onChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select an option</option>
          {currentItem.options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;

    default:
      content = <div>Unknown component type</div>;
  }

  return (
    <div className="mb-4">
      {currentItem.label && (
        <label htmlFor={currentItem.name} className="block font-medium mb-1">
          {currentItem.label}
        </label>
      )}
      {content}
    </div>
  );
}
