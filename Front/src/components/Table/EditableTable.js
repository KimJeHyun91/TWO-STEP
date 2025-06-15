import React from 'react'
import './EditableTable.css'
import {
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell,
  CTableRow, CCard, CCardBody, CCardHeader
} from '@coreui/react'

const EditableTable = ({
  title,
  tableKey,
  columns,
  data,
  fetchData,
  editId,
  setEditId,
  editRow,
  setEditRow,
  newData,
  setNewData,
  addTable,
  setAddTable,
  handleRowChange,
  handleEdit,
  handleSave,
  handleAdd,
  handleCancle,
  handleDelete,

  // 리뷰 테이블에서 버튼 예외처리하기 위한 prop
  showAdd = true,
  showEdit = true,
}) => {
  return (
    <CCard className="mb-4">
      <CCardHeader className="text-white bg-secondary">
        {title}

        {showAdd && (
          <button
            onClick={() => setAddTable(addTable === tableKey ? null : tableKey)}
            style={{ marginLeft: '16px' }}
          >
            데이터 추가
          </button>
        )}
      </CCardHeader>
      {addTable === tableKey && (
        <div style={{ backgroundColor: '#444', color: '#fff', padding: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {columns.map((col) => (
            col.type === 'textarea' ? (
              <textarea
                key={col.key}
                placeholder={col.label}
                style={{ flex: '1 1 300px', height: '80px' }}
                value={newData[col.key] || ''}
                onChange={(e) => setNewData(prev => ({ ...prev, [col.key]: e.target.value }))}
              />
            ) : (
              <input
                key={col.key}
                placeholder={col.label}
                style={{ flex: '1 1 200px' }}
                value={newData[col.key] || ''}
                onChange={(e) => setNewData(prev => ({ ...prev, [col.key]: e.target.value }))}
              />
            )
          ))}
          <div style={{ marginTop: '8px' }}>
            <button onClick={handleAdd}>추가</button>
            <button onClick={() => setAddTable(null)} style={{ marginLeft: '8px' }}>취소</button>
          </div>
        </div>
      )}

      <CCardBody style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <CTable hover responsive>
          <CTableHead className="sticky-header">
            <CTableRow className="bg-secondary">
              {columns.map(col => (
                <CTableHeaderCell key={col.key}>{col.label}</CTableHeaderCell>
              ))}
              <CTableHeaderCell>작업</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((item, index) => (
              <CTableRow key={index} className="bg-secondary">
                {columns.map((col) => (
                  <CTableDataCell key={col.key}>
                    {editId?.index === index && editId?.table === tableKey ? (
                      col.type === 'textarea' ? (
                        <textarea
                          style={{ width: '100%' }}
                          rows={3}
                          value={editRow[col.key] || ''}
                          onChange={e => handleRowChange(col.key, e.target.value)}
                        />
                      ) : (
                        <input
                          value={editRow[col.key] || ''}
                          onChange={e => handleRowChange(col.key, e.target.value)}
                        />
                      )
                    ) : col.type === 'textarea' ? (
                      <div style={{ maxHeight: '80px', overflowY: 'auto', wordBreak: 'break-word' }}>{item[col.key]}</div>
                    ) : (
                      item[col.key]
                    )}
                  </CTableDataCell>
                ))}
                <CTableDataCell>
                  {editId?.index === index && editId?.table === tableKey && showEdit ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={handleSave}>저장</button>
                      <button onClick={handleCancle}>취소</button>
                      <button onClick={() => handleDelete(item, tableKey)}>삭제❌</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {showEdit && (
                        <button onClick={() => handleEdit(item, tableKey, columns[0].key, index)}>수정✏️</button>
                      )}
                      <button onClick={() => handleDelete(item, tableKey)}>삭제❌</button>
                    </div>
                  )}


                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default EditableTable
