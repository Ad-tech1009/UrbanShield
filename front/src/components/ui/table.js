export function Table({ children }) {
    return (
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white border-collapse">{children}</table>
      </div>
    );
  }
  
  export function TableHeader({ children }) {
    return (
      <thead className="bg-gray-100 border-b">
        {children}
      </thead>
    );
  }
  
  export function TableBody({ children }) {
    return <tbody>{children}</tbody>;
  }
  
  export function TableRow({ children }) {
    return <tr className="border-b hover:bg-gray-50">{children}</tr>;
  }
  
  export function TableCell({ children }) {
    return <td className="p-3 border-r text-gray-700 text-left">{children}</td>;
  }
  