import { ReactFlow, Background, BackgroundVariant, Controls, useNodesState, useEdgesState, MarkerType } from '@xyflow/react';
import { InfoCircledIcon,EyeOpenIcon } from "@radix-ui/react-icons"
import { useCallback, useState } from 'react'; 
import '@xyflow/react/dist/style.css'; 

const initialNodes = [
  { id: 'n1', position: { x: 500, y: 350 }, data: { label: 'Server' }, 
    style: { backgroundColor: '#75f64bff', border: '1px solid #222' },  },
  { id: 'n2', position: { x: 500, y: 600 }, data: { label: 'Router1' } },
  { id: 'n3', position: { x: 750, y: 500 }, data: { label: 'Router2' } },
  { id: 'n4', position: { x: 250, y: 550 }, data: { label: 'Router3' } },
];

const initialEdges = [
  { id: "n1-n2", source: 'n1', target: 'n2', label: 'sending data to Router1',
    markerEnd: { type: MarkerType.ArrowClosed, color: 'green' }, style: { stroke: 'green', strokeWidth: 1.8 }, animated:'true' },
  { id: "n1-n3", source: 'n1', target: 'n3', label: 'sending Response to Router2', 
    markerEnd: { type: MarkerType.ArrowClosed, color: 'green' }, style: { stroke: 'Green', strokeWidth: 5 }, type: 'smoothstep' },
  { id: "n1-n4", source: 'n1', target: 'n4', label: 'sending data to Router3', 
    markerEnd: { type: MarkerType.ArrowClosed, color: 'green' }, style: { stroke: 'green', strokeWidth: 1.8 } },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, node: null });

  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      node: node
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0, node: null });
  }, []);

  const handleMenuAction = useCallback((action) => {
    const node = contextMenu.node;
    if (!node) return;

    switch (action) {
      case 'inspect':
        alert(`Inspecting ${node.data.label}\nID: ${node.id}`);
        break;
      case 'info':
        alert(`Node: ${node.data.label}\nID: ${node.id}`);
        break;
    }
    closeContextMenu();
  }, [contextMenu.node, closeContextMenu]);

  // Rendering the Component
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }} onClick={closeContextMenu}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background color="blue" variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>

      {contextMenu.visible && (
        <div
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 2000,
            minWidth: '180px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee', display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}
               onClick={() => handleMenuAction('inspect')}>
                <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                Inspect Node
          </div>
          <div style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' , display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}
              onClick={() => handleMenuAction('info')}>
              <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            Show Info
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


