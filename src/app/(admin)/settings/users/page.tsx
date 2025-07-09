const UserSettings = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2>Users</h2>
        <button>Add User</button>
      </div>
      <article>
        <table className="flex items-center w-full justify-between">
          <thead>S/N</thead>
          <thead>Name</thead>
          <thead>email</thead>
        </table>
      </article>
    </section>
  );
};

export default UserSettings;
