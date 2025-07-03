import { Settings2 } from 'lucide-react';
import { RegularPaymentProps } from '../types/RegularPayment';

const statusStyle = {
  paid: 'bg-green-500 text-white',
  due: 'bg-pink-600 text-white',
  scheduled: 'bg-gray-300 text-white',
};

const RegularPayment = ({ items }: RegularPaymentProps) => {
  // first item은 현재 날짜와 가장 가까운 날을 찾아 그 지점을 focus하는 요건이 필요함

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 w-full">
        <h3 className="text-lg text-gray-900 font-bold text-shadow">Regular Payment</h3>
        <div>
          <Settings2 className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="relative flex-1 min-h-0">
        <div className="absolute left-[49px] top-0 bottom-8 w-0.5 h-full bg-gray-200"></div>
        <div className="space-y-6 custom-scrollbar overflow-y-auto h-full pr-2">
          {items.map((item) => (
            <div key={item.id} id={`item-${item.id}`} className="relative flex items-start">
              <div className="text-right w-8">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.date}</div>
              </div>
              <div className="relative flex-shrink-0 mx-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${statusStyle[item.status]} shadow-md`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0 ml-3 mt-[-5px]">
                <div
                  className={`text-base font-semibold ${item.status === 'paid' ? 'text-gray-900' : item.status === 'due' ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  {item.status === 'paid' ? 'Paid' : item.status === 'due' ? 'Payment Due' : 'Scheduled'}
                </div>
                <div className={`text-sm ${item.status === 'scheduled' ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</div>
                <div className="text-xs text-gray-400">{item.amount?.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegularPayment;
