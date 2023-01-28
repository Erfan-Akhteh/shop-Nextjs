import Typewriter from 'typewriter-effect';

const TypeEffect = () => {
  const strings = [
    'Welcome To The Shop.',
    'Author Website Erfan Akhteh',
    'Iam font-end developer.',
    'Github:Erfan-Akhteh',
  ];

  return (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(strings[0])
          .pauseFor(4000)
          .deleteAll()
          .pauseFor(2000)
          .typeString(strings[1])
          .pauseFor(4000)
          .deleteAll()
          .pauseFor(2000)
          .typeString(strings[2])
          .pauseFor(4000)
          .deleteAll()
          .pauseFor(2000)
          .typeString(strings[3])
          .pauseFor(4000)
          .deleteAll()
          .pauseFor(2000)
          .start();
      }}
    />
  );
};

export default TypeEffect;