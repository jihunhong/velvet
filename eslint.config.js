import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      prettier, // Prettier와 충돌하는 규칙 비활성화
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks 관련 규칙
      ...reactHooks.configs.recommended.rules,
      // React Refresh 플러그인 규칙 - 컴포넌트만 export하도록 제한
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 사용하지 않는 변수 경고 (언더스코어로 시작하는 매개변수는 제외)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // 함수의 반환 타입을 명시적으로 작성하도록 경고
      '@typescript-eslint/explicit-function-return-type': 'warn',
      // any 타입 사용 시 경고
      '@typescript-eslint/no-explicit-any': 'warn',
      // non-null assertion operator(!) 사용 시 경고
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // console.log 사용 시 경고 (console.warn과 console.error는 허용)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // let 대신 const 사용 권장
      'prefer-const': 'warn',
      // 중복된 import 문 사용 금지
      'no-duplicate-imports': 'error',
      // 연속된 빈 줄 최대 1개로 제한
      'no-multiple-empty-lines': ['error', { max: 1 }],
      // 줄 끝의 공백 제거
      'no-trailing-spaces': 'error',
      // 파일 끝에 빈 줄 추가
      'eol-last': 'error',
      
      // 들여쓰기 관련 규칙
      'indent': ['error', 2, {
        'SwitchCase': 1, // switch-case문의 case는 1칸 들여쓰기
        'FunctionDeclaration': {
          'parameters': 'first' // 함수 매개변수가 여러 줄일 때 첫 번째 매개변수에 맞춤
        },
        'FunctionExpression': {
          'parameters': 'first'
        },
        'CallExpression': {
          'arguments': 'first' // 함수 호출의 인자가 여러 줄일 때 첫 번째 인자에 맞춤
        },
        'ArrayExpression': 'first', // 배열 요소가 여러 줄일 때 첫 번째 요소에 맞춤
        'ObjectExpression': 'first', // 객체 속성이 여러 줄일 때 첫 번째 속성에 맞춤
        'ImportDeclaration': 'first', // import 문이 여러 줄일 때 첫 번째 import에 맞춤
        'flatTernaryExpressions': false, // 삼항 연산자 내부의 들여쓰기 허용
        'ignoreComments': false // 주석도 들여쓰기 규칙 적용
      }],
      
      // 중괄호 관련 규칙
      'object-curly-spacing': ['error', 'always'], // 객체 중괄호 안에 공백 추가 { key: value }
      'array-bracket-spacing': ['error', 'never'], // 배열 대괄호 안에 공백 없음 [1, 2, 3]
      'computed-property-spacing': ['error', 'never'], // 계산된 속성의 대괄호 안에 공백 없음 obj[prop]
      'template-curly-spacing': ['error', 'never'], // 템플릿 리터럴의 중괄호 안에 공백 없음 ${value}
      'block-spacing': ['error', 'always'], // 블록 중괄호 안에 공백 추가 { statement }
      'key-spacing': ['error', { // 객체 속성의 콜론 앞뒤 공백 규칙
        'beforeColon': false, // 콜론 앞 공백 없음
        'afterColon': true, // 콜론 뒤 공백 있음
        'mode': 'strict' // 모든 속성에 동일하게 적용
      }],
      
      // 기타 스타일 관련 규칙
      'semi': ['error', 'always'], // 문장 끝에 세미콜론 필수
      'quotes': ['error', 'single', { // 작은따옴표 사용 (템플릿 리터럴은 예외)
        'avoidEscape': true, // 문자열 내에 작은따옴표가 있을 때 큰따옴표 허용
        'allowTemplateLiterals': true // 템플릴 리터럴은 큰따옴표 허용
      }],
      'comma-dangle': ['error', { // 여러 줄일 때 마지막 쉼표 필수
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline'
      }],
      'arrow-spacing': ['error', { // 화살표 함수의 화살표 앞뒤 공백
        'before': true,
        'after': true
      }],
      'space-before-function-paren': ['error', { // 함수 괄호 앞 공백 규칙
        'anonymous': 'always', // 익명 함수는 공백 있음
        'named': 'never', // 이름 있는 함수는 공백 없음
        'asyncArrow': 'always' // async 화살표 함수는 공백 있음
      }],
      'space-before-blocks': ['error', 'always'], // 블록 시작 전 공백
      'keyword-spacing': ['error', { // 키워드 앞뒤 공백
        'before': true,
        'after': true
      }],
      'space-infix-ops': 'error', // 연산자 앞뒤 공백
      'space-unary-ops': ['error', { // 단항 연산자 공백 규칙
        'words': true, // 단어 단항 연산자(delete, typeof 등)는 공백 있음
        'nonwords': false // 기호 단항 연산자(+, -, ! 등)는 공백 없음
      }],
      'no-multi-spaces': 'error', // 여러 개의 공백 사용 금지
      'no-whitespace-before-property': 'error', // 객체 속성 접근 전 공백 금지
      'rest-spread-spacing': ['error', 'never'], // rest/spread 연산자 주변 공백 없음
      'object-property-newline': ['error', { // 객체 속성 줄바꿈 규칙
        'allowAllPropertiesOnSameLine': true // 한 줄에 모든 속성이 들어갈 수 있으면 허용
      }],
      'object-curly-newline': ['error', { // 객체 중괄호 줄바꿈 규칙
        'multiline': true, // 여러 줄일 때 중괄호 줄바꿈
        'consistent': true // 일관성 있게 적용
      }],
      'array-bracket-newline': ['error', { // 배열 대괄호 줄바꿈 규칙
        'multiline': true // 여러 줄일 때 대괄호 줄바꿈
      }],
      'array-element-newline': ['error', { // 배열 요소 줄바꿈 규칙
        'multiline': true, // 여러 줄일 때 요소 줄바꿈
        'minItems': 3 // 최소 3개 이상의 요소가 있을 때 적용
      }]
    },
  },
)
