import { useReducer, useState } from "react";

// ① 초기 상태
const initialState = {
  cart: [],
  totalPrice: 0,
  history: [],
};

// ② Reducer 함수 — action.type에 따라 상태를 어떻게 바꿀지 정의
function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_ITEM": {
      const exists = state.cart.find(i => i.id === action.item.id);
      const newCart = exists
        ? state.cart.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.cart, { ...action.item, qty: 1 }];
      return {
        ...state,
        cart: newCart,
        totalPrice: state.totalPrice + action.item.price,
        history: [`✅ "${action.item.name}" 추가`, ...state.history.slice(0, 4)],
      };
    }

    case "REMOVE_ITEM": {
      const target = state.cart.find(i => i.id === action.id);
      if (!target) return state;
      const newCart = target.qty > 1
        ? state.cart.map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i)
        : state.cart.filter(i => i.id !== action.id);
      return {
        ...state,
        cart: newCart,
        totalPrice: state.totalPrice - target.price,
        history: [`➖ "${target.name}" 1개 제거`, ...state.history.slice(0, 4)],
      };
    }

    case "CLEAR_CART":
      return {
        ...initialState,
        history: ["🗑 장바구니 전체 비움", ...state.history.slice(0, 4)],
      };

    case "APPLY_DISCOUNT":
      return {
        ...state,
        totalPrice: Math.floor(state.totalPrice * 0.9),
        history: ["🎟 10% 할인 적용!", ...state.history.slice(0, 4)],
      };

    default:
      return state;
  }
}

// 상품 목록
const PRODUCTS = [
  { id: 1, name: "아메리카노", price: 3500, emoji: "☕" },
  { id: 2, name: "크로와상",   price: 4200, emoji: "🥐" },
  { id: 3, name: "치즈케이크", price: 6800, emoji: "🍰" },
  { id: 4, name: "자몽에이드", price: 5500, emoji: "🍊" },
];

const C = {
  bg:      "#0d0d0d",
  panel:   "#161616",
  border:  "#2a2a2a",
  accent:  "#f0c040",
  text:    "#f0ede8",
  muted:   "#888",
  danger:  "#ff5c5c",
  green:   "#4ade80",
};

const btn = (bg, color = "#000") => ({
  padding: "8px 16px", borderRadius: 8, border: "none",
  background: bg, color, cursor: "pointer",
  fontWeight: 700, fontSize: 13, transition: "opacity 0.15s",
});

export default function App() {
  // ③ useReducer 사용 — [state, dispatch]
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [showCode, setShowCode] = useState(null);

  const actionExamples = {
    ADD_ITEM:       `dispatch({\n  type: "ADD_ITEM",\n  item: { id:1, name:"아메리카노", price:3500 }\n})`,
    REMOVE_ITEM:    `dispatch({\n  type: "REMOVE_ITEM",\n  id: 1\n})`,
    APPLY_DISCOUNT: `dispatch({\n  type: "APPLY_DISCOUNT"\n})`,
    CLEAR_CART:     `dispatch({\n  type: "CLEAR_CART"\n})`,
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Georgia', serif", padding: 20 }}>
      <style>{`button:hover { opacity: 0.82; } * { box-sizing: border-box; }`}</style>

      <h2 style={{ textAlign: "center", letterSpacing: 2, color: C.accent, fontSize: 20, marginBottom: 4 }}>
        ☕ useReducer 실습 — 카페 장바구니
      </h2>
      <p style={{ textAlign: "center", color: C.muted, fontSize: 13, marginBottom: 24 }}>
        버튼을 누르면 <code style={{ color: C.accent }}>dispatch</code>가 실행되고 <code style={{ color: C.accent }}>reducer</code>가 상태를 바꿉니다
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 760, margin: "0 auto" }}>

        {/* 상품 목록 */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 14, color: C.muted, letterSpacing: 1 }}>MENU</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PRODUCTS.map(p => (
              <div key={p.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 14px", borderRadius: 10,
                background: "#1e1e1e", border: `1px solid ${C.border}`
              }}>
                <span style={{ fontSize: 15 }}>{p.emoji} {p.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: C.accent, fontWeight: 700 }}>{p.price.toLocaleString()}원</span>
                  <button
                    style={btn(C.accent)}
                    onClick={() => {
                      dispatch({ type: "ADD_ITEM", item: p });
                      setShowCode("ADD_ITEM");
                    }}>
                    + 담기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 장바구니 */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 14, color: C.muted, letterSpacing: 1 }}>CART</h3>

          {state.cart.length === 0
            ? <p style={{ color: C.muted, fontSize: 14, textAlign: "center", marginTop: 30 }}>🛒 비어있음</p>
            : state.cart.map(item => (
              <div key={item.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "9px 12px", borderRadius: 9, background: "#1e1e1e",
                border: `1px solid ${C.border}`, marginBottom: 8
              }}>
                <span style={{ fontSize: 14 }}>{item.emoji} {item.name} × {item.qty}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: C.accent, fontSize: 13 }}>{(item.price * item.qty).toLocaleString()}원</span>
                  <button
                    style={btn("#2a2a2a", C.danger)}
                    onClick={() => {
                      dispatch({ type: "REMOVE_ITEM", id: item.id });
                      setShowCode("REMOVE_ITEM");
                    }}>
                    −
                  </button>
                </div>
              </div>
            ))
          }

          {state.cart.length > 0 && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ color: C.muted }}>합계</span>
                <span style={{ color: C.accent, fontWeight: 700, fontSize: 18 }}>
                  {state.totalPrice.toLocaleString()}원
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...btn(C.green), flex: 1 }}
                  onClick={() => { dispatch({ type: "APPLY_DISCOUNT" }); setShowCode("APPLY_DISCOUNT"); }}>
                  🎟 10% 할인
                </button>
                <button style={{ ...btn("#2a2a2a", C.danger), flex: 1 }}
                  onClick={() => { dispatch({ type: "CLEAR_CART" }); setShowCode("CLEAR_CART"); }}>
                  🗑 전체삭제
                </button>
              </div>
            </div>
          )}
        </div>

        {/* dispatch 코드 뷰어 */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: C.muted, letterSpacing: 1 }}>
            DISPATCH 코드 <span style={{ color: C.accent }}>← 방금 실행됨</span>
          </h3>
          <pre style={{
            background: "#0a0a0a", borderRadius: 9, padding: 14,
            fontSize: 13, color: "#7dd3fc", margin: 0, minHeight: 90,
            border: `1px solid ${C.border}`, whiteSpace: "pre-wrap"
          }}>
            {showCode ? actionExamples[showCode] : "// 버튼을 눌러보세요!"}
          </pre>
        </div>

        {/* 액션 히스토리 */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: C.muted, letterSpacing: 1 }}>ACTION HISTORY</h3>
          {state.history.length === 0
            ? <p style={{ color: C.muted, fontSize: 13 }}>// 아직 액션 없음</p>
            : state.history.map((h, i) => (
              <div key={i} style={{
                padding: "7px 12px", borderRadius: 7, marginBottom: 6,
                background: i === 0 ? "#1e2a1e" : "#1a1a1a",
                border: `1px solid ${i === 0 ? "#2d5a2d" : C.border}`,
                fontSize: 13, color: i === 0 ? C.green : C.muted,
                fontWeight: i === 0 ? 700 : 400
              }}>
                {i === 0 && "▶ "}{h}
              </div>
            ))
          }
        </div>
      </div>

      {/* 개념 정리 */}
      <div style={{
        maxWidth: 760, margin: "20px auto 0",
        background: C.panel, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: 18, fontSize: 13
      }}>
        <h3 style={{ margin: "0 0 12px", color: C.accent, fontSize: 14, letterSpacing: 1 }}>📐 useState vs useReducer</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "#1a1a1a", borderRadius: 9, padding: 14, border: `1px solid ${C.border}` }}>
            <div style={{ color: "#7dd3fc", fontWeight: 700, marginBottom: 8 }}>useState</div>
            <div style={{ color: C.muted, lineHeight: 1.8 }}>
              ✔ 단순한 값 하나<br/>
              ✔ 변경 로직이 간단할 때<br/>
              ✗ 여러 값이 연관되면 복잡해짐
            </div>
          </div>
          <div style={{ background: "#1a2010", borderRadius: 9, padding: 14, border: `1px solid #2d5a1a` }}>
            <div style={{ color: C.green, fontWeight: 700, marginBottom: 8 }}>useReducer ← 이 예제</div>
            <div style={{ color: C.muted, lineHeight: 1.8 }}>
              ✔ 여러 값이 함께 바뀔 때<br/>
              ✔ 액션 종류가 많을 때<br/>
              ✔ 상태 변경 로직을 한 곳에!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}