import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const riderRegion = useWatch({ control, name: "region" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach to you in 45 days",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl">Be a rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-8 p-4"
      >
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Rider info */}
          <div>
            <h4 className="text-xl font-semibold">Rider Details</h4>
            <fieldset className="fieldset">
              {/* Sender Name */}
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Your Name"
              />

              {/*  Address */}
              <label className="label mt-4">Your Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Your Address"
              />

              {/* Sender Email */}
              <label className="label mt-4">Rider Email</label>
              <input
                type="email"
                {...register("email")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Rider Email"
              />

              {/* Sender Regions */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Regions</legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Sender District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">District</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtByRegion(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
            </fieldset>
          </div>

          {/* receiver info */}
          <div>
            <h4 className="text-xl font-semibold">More Details</h4>
            <fieldset className="fieldset">
              {/* receiver Name */}
              <label className="label">Driving License</label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />

              {/* Receiver Address */}
              <label className="label mt-4">BIKE</label>
              <input
                type="text"
                {...register("bike")}
                className="input w-full"
                placeholder="Bike"
              />

              {/* Receiver Email */}
              <label className="label mt-4">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="NID"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
