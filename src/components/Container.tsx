"use client";

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({children}:Readonly<{
    children: React.ReactNode;
  }>) => {
    return ( 
        <div
            className="max-w-[2520px] mx-auto xl:px20 md:px-10 sm:px-2 px-4 "
        >
            {children}
        </div>
        
     );
}
 
export default Container;