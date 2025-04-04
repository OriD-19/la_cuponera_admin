import React from 'react';

const EnterpriseFilter = ({ enterprises, selectedEnterprise, onEnterpriseChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="enterprise-select" className="block text-gray-700 font-bold mb-2">
        Seleccionar Empresa:
      </label>
      <select
        id="enterprise-select"
        value={selectedEnterprise}
        onChange={(e) => onEnterpriseChange(e.target.value)}
        className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Todas las Empresas</option>
        {enterprises.map((enterprise) => (
          <option key={enterprise.id} value={enterprise.id}>
            {/*No tienen nombres las empresas, pero el code esta bien, yo creo */}
            {enterprise.enterpriseCode} (ID: {enterprise.id})
          </option>
        ))}
      </select>
    </div>
  );
};

export default EnterpriseFilter;