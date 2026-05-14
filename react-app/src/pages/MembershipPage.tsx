import React from 'react';

export default function MembershipPage() {
  return (
    <div className="pb-8">
      {/* Membership Card (Premium Style) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#022c22] to-[#006c49] p-6 shadow-xl mb-8 border border-white/10">
        {/* Decorative Elements */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col h-full gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-white/80 text-sm font-medium tracking-wide uppercase">
                Thẻ thành viên
              </h2>
              <p className="text-white font-headline-md font-bold text-2xl mt-1 tracking-tight">
                Nguyễn Văn A
              </p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-300 px-3 py-1.5 rounded-full backdrop-blur-sm border border-yellow-400/30">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="text-sm font-bold tracking-wide">HẠNG VÀNG</span>
            </div>
          </div>

          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-white/70 text-sm mb-1">Điểm tích lũy</p>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-headline-lg font-bold text-4xl">1,250</span>
                <span className="text-white/80 font-medium">PCF</span>
              </div>
            </div>
            <button className="flex items-center justify-center w-12 h-12 bg-white text-primary rounded-xl shadow-lg active:scale-90 transition-transform hover:bg-gray-50">
              <span className="material-symbols-outlined text-[28px]">qr_code_2</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress to Next Tier */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-variant mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-on-surface">Tiến trình hạng Kim Cương</span>
          <span className="text-sm text-primary font-bold">1,250 / 3,000</span>
        </div>
        {/* Progress Bar */}
        <div className="h-2.5 w-full bg-surface-variant rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-[#4edea3] rounded-full"
            style={{ width: '41.6%' }}
          ></div>
        </div>
        <p className="text-xs text-on-surface-variant mt-3 text-center">
          Tích lũy thêm <span className="font-bold text-secondary">1,750 điểm</span> để thăng hạng
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <button className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-surface-variant hover:bg-surface-variant/50 transition-colors active:scale-95">
          <div className="w-10 h-10 rounded-full bg-[#fed3c7]/30 text-[#795950] flex items-center justify-center mb-2">
            <span className="material-symbols-outlined">card_giftcard</span>
          </div>
          <span className="text-xs font-semibold text-on-surface">Đổi quà</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-surface-variant hover:bg-surface-variant/50 transition-colors active:scale-95">
          <div className="w-10 h-10 rounded-full bg-[#fadcd2]/40 text-[#56423b] flex items-center justify-center mb-2">
            <span className="material-symbols-outlined">history</span>
          </div>
          <span className="text-xs font-semibold text-on-surface">Lịch sử</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-surface-variant hover:bg-surface-variant/50 transition-colors active:scale-95">
          <div className="w-10 h-10 rounded-full bg-[#6ffbbe]/20 text-[#00422b] flex items-center justify-center mb-2">
            <span className="material-symbols-outlined">local_activity</span>
          </div>
          <span className="text-xs font-semibold text-on-surface">Voucher</span>
        </button>
      </div>

      {/* Privileges / Offers */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline-md font-bold text-lg text-on-surface">Đặc quyền Hạng Vàng</h3>
          <span className="text-sm text-primary font-medium hover:underline cursor-pointer">
            Xem tất cả
          </span>
        </div>

        <div className="space-y-3">
          {/* Privilege 1 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-surface-variant flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-[#10b981]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                cake
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-on-surface">Quà tặng sinh nhật</h4>
              <p className="text-sm text-on-surface-variant mt-0.5">
                Tặng 1 ly nước bất kỳ size M vào tháng sinh nhật.
              </p>
            </div>
          </div>

          {/* Privilege 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-surface-variant flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sell
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-on-surface">Giảm giá 10%</h4>
              <p className="text-sm text-on-surface-variant mt-0.5">
                Áp dụng cho mọi hóa đơn từ 150.000đ trở lên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
