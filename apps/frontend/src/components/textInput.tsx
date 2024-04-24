interface InputProps {
    title: string;
    value: string;
    placeholder: string;
    onChange: (event) => void;
    isPassword: boolean;
}

export default function TextInput({ title, value, placeholder, onChange, isPassword }: InputProps) {
    return (
        <div className="space-y-2">
            <p>{title}</p>
            <input
                className="border border-purple-700 rounded h-10 w-[300px]"
                type={isPassword ? "password" : "text"} 
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
}