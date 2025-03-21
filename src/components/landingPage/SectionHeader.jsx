const SectionHeader = ({ title, subtitle }) => {
  return (
    <header className="w-full flex flex-col gap-4 items-center justify-center mb-[2.5rem]">
      <h2 className="text-[#0D0D0D] text-[3rem] leading-[3.75rem] tracking-[-0.06rem] font-[500]">
        {title}
      </h2>
      <p className="text-lg text-[#696969] font-[400] tracking-[-0.01125rem]">
        {subtitle}
      </p>
    </header>
  );
};

export default SectionHeader;
